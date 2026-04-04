import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() data: any) {
    return this.authService.signUp(data);
  }

  @Post('signin')
  signin(@Body() data: any, @Req() req: any) {
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'Unknown';
    const userAgent = req.headers['user-agent'] || '';
    return this.authService.signIn(data, { ip: String(ip), userAgent });
  }

  @Post('signin/2fa')
  signinTwoFactor(@Body() body: { userId: string; token: string }, @Req() req: any) {
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'Unknown';
    const userAgent = req.headers['user-agent'] || '';
    return this.authService.verifyLoginTwoFactor(body.userId, body.token, { ip: String(ip), userAgent });
  }

  // ── Forgot Password (public endpoints) ──────────────────────
  @Post('forgot-password')
  forgotPassword(@Body() body: { email: string }) {
    return this.authService.generateResetOtp(body.email);
  }

  @Post('verify-reset-otp')
  verifyResetOtp(@Body() body: { email: string; otp: string }) {
    return this.authService.verifyResetOtp(body.email, body.otp);
  }

  @Post('reset-password')
  resetPassword(@Body() body: { email: string; otp: string; newPassword: string }) {
    return this.authService.resetPassword(body.email, body.otp, body.newPassword);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: any) {
    return this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: any) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
  
  @UseGuards(AccessTokenGuard)
  @Get('me')
  async me(@Req() req: any) {
    return this.authService.getMe(req.user['sub']);
  }
}
