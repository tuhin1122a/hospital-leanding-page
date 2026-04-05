import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';

// In-memory OTP store: { email -> { otp, expiresAt } }
const resetOtpStore = new Map<string, { otp: string; expiresAt: number }>();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(data: any) {
    const userExists = await this.usersService.findByEmail(data.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.hashData(data.password);
    const newUser = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.role,
    );
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(data: any, meta?: { ip?: string; userAgent?: string }) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const passwordMatches = await bcrypt.compare(data.password, user.password);
    if (!passwordMatches) {
      await this.usersService
        .recordLogin(user.id, { ...meta, success: false })
        .catch(() => {});
      throw new BadRequestException('Invalid credentials');
    }

    // If 2FA is enabled, don't return tokens yet — ask for TOTP
    if (user.twoFactorEnabled) {
      return { requiresTwoFactor: true, userId: user.id };
    }

    await this.usersService
      .recordLogin(user.id, { ...meta, success: true })
      .catch(() => {});
    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async verifyLoginTwoFactor(
    userId: string,
    token: string,
    meta?: { ip?: string; userAgent?: string },
  ) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.twoFactorSecret) {
      throw new BadRequestException('2FA not configured');
    }

    const isValid = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (!isValid) {
      await this.usersService
        .recordLogin(userId, { ...meta, success: false })
        .catch(() => {});
      throw new BadRequestException('Invalid authenticator code');
    }

    await this.usersService
      .recordLogin(userId, { ...meta, success: true })
      .catch(() => {});
    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    return this.usersService.update(userId, {
      refreshToken: null,
      lastActive: new Date(),
    });
  }

  // ── Forgot Password ───────────────────────────────────────────────
  async generateResetOtp(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user)
      throw new BadRequestException('No account found with this email');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    resetOtpStore.set(email, { otp, expiresAt });

    // TODO: real email এ পাঠান — এখন console-এ দেখাচ্ছি
    console.log(`\n====================================`);
    console.log(`  Password Reset OTP for: ${email}`);
    console.log(`  OTP: ${otp}  (expires in 10 min)`);
    console.log(`====================================\n`);

    return { message: 'OTP sent to your email' };
  }

  async verifyResetOtp(email: string, otp: string) {
    const entry = resetOtpStore.get(email);
    if (!entry)
      throw new BadRequestException('No OTP requested for this email');
    if (Date.now() > entry.expiresAt) {
      resetOtpStore.delete(email);
      throw new BadRequestException('OTP expired. Request a new one.');
    }
    if (entry.otp !== otp) throw new BadRequestException('Invalid OTP');
    return { message: 'OTP verified' };
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    // re-verify OTP before changing password
    await this.verifyResetOtp(email, otp);
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('User not found');

    const hashed = await this.hashData(newPassword);
    await this.usersService.update(user.id, { password: hashed });
    resetOtpStore.delete(email); // OTP use করা হয়ে গেছে
    return { message: 'Password reset successfully' };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async getMe(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) return null;
    const { password, ...rest } = user;
    return rest;
  }

  private hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  private async getTokens(userId: string, email: string, role: string) {
    const jwtSecret =
      process.env.JWT_SECRET || 'super-secret-jwt-key-change-this';
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: jwtSecret,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: jwtSecret,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
