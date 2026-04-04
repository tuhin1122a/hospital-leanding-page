import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadProfilePic(userId: string, file: Express.Multer.File): Promise<User> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'nurjahan_profiles' },
        async (error, result) => {
          if (error || !result) return reject(error || new Error('Upload failed'));
          const user = await this.update(userId, { profilePic: result.secure_url });
          resolve(user);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new BadRequestException('Current password is incorrect');

    const hashed = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({ where: { id: userId }, data: { password: hashed } });
    return { message: 'Password updated successfully' };
  }

  async generate2FASecret(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');

    const secret = speakeasy.generateSecret({
      name: `Nurjahan Hospital (${user.email})`,
      issuer: 'Nurjahan Hospital',
    });

    // Save temp secret (not enabled yet until verified)
    await this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorSecret: secret.base32 },
    });

    const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url!);
    return { secret: secret.base32, qrCode: qrCodeDataUrl };
  }

  async verify2FA(userId: string, token: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.twoFactorSecret) throw new BadRequestException('2FA not set up');

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (!verified) throw new BadRequestException('Invalid 2FA code');

    await this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: true },
    });

    return { message: '2FA enabled successfully' };
  }

  async disable2FA(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: false, twoFactorSecret: null },
    });
    return { message: '2FA disabled' };
  }

  async getLoginHistory(userId: string) {
    return this.prisma.loginHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }

  async recordLogin(userId: string, meta: { ip?: string; userAgent?: string; success?: boolean }) {
    const ua = meta.userAgent || '';
    // Simple UA parsing
    const isMobile = /mobile|android|iphone|ipad/i.test(ua);
    const browser =
      /chrome/i.test(ua) ? 'Chrome' :
      /firefox/i.test(ua) ? 'Firefox' :
      /safari/i.test(ua) ? 'Safari' :
      /edge/i.test(ua) ? 'Edge' : 'Unknown';
    const os =
      /windows/i.test(ua) ? 'Windows' :
      /android/i.test(ua) ? 'Android' :
      /iphone|ipad/i.test(ua) ? 'iOS' :
      /mac/i.test(ua) ? 'macOS' :
      /linux/i.test(ua) ? 'Linux' : 'Unknown';

    return this.prisma.loginHistory.create({
      data: {
        userId,
        ip: meta.ip || 'Unknown',
        userAgent: ua,
        device: isMobile ? 'Mobile' : 'Desktop',
        browser,
        os,
        success: meta.success ?? true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        permissions: true,
        profilePic: true,
        twoFactorEnabled: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createUser(data: { name: string; email: string; password: string; role: string; permissions?: string[] }) {
    const userExists = await this.findByEmail(data.email);
    if (userExists) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role.toUpperCase(),
        permissions: data.permissions || ['READ'],
      },
    });
  }

  async updatePermissions(id: string, permissions: string[]) {
    return this.prisma.user.update({
      where: { id },
      data: { permissions },
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
