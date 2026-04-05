import {
  Controller,
  Post,
  Get,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  Body,
  ForbiddenException,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('profile-pic')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePic(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = req.user['sub'];
    return this.usersService.uploadProfilePic(userId, file);
  }

  @Post('change-password')
  @UseGuards(AccessTokenGuard)
  async changePassword(
    @Req() req: any,
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    return this.usersService.changePassword(
      req.user['sub'],
      body.currentPassword,
      body.newPassword,
    );
  }

  @Get('2fa/generate')
  @UseGuards(AccessTokenGuard)
  async generate2FA(@Req() req: any) {
    return this.usersService.generate2FASecret(req.user['sub']);
  }

  @Post('2fa/verify')
  @UseGuards(AccessTokenGuard)
  async verify2FA(@Req() req: any, @Body() body: { token: string }) {
    return this.usersService.verify2FA(req.user['sub'], body.token);
  }

  @Delete('2fa/disable')
  @UseGuards(AccessTokenGuard)
  async disable2FA(@Req() req: any) {
    return this.usersService.disable2FA(req.user['sub']);
  }

  @Get('login-history')
  @UseGuards(AccessTokenGuard)
  async getLoginHistory(@Req() req: any) {
    return this.usersService.getLoginHistory(req.user['sub']);
  }

  // ── Admin only endpoints ──────────────────────────────
  @Get()
  @UseGuards(AccessTokenGuard)
  async getAllUsers(@Req() req: any) {
    if (req.user['role'] !== 'ADMIN') {
      throw new ForbiddenException('Access denied: Admins only');
    }
    return this.usersService.getAllUsers();
  }

  @Post('create')
  @UseGuards(AccessTokenGuard)
  async createUser(
    @Req() req: any,
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      role: string;
      permissions: string[];
    },
  ) {
    if (req.user['role'] !== 'ADMIN') {
      throw new ForbiddenException('Access denied: Admins only');
    }
    return this.usersService.createUser(body);
  }

  @Post(':id/permissions')
  @UseGuards(AccessTokenGuard)
  async updatePermissions(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { permissions: string[] },
  ) {
    if (req.user['role'] !== 'ADMIN') {
      throw new ForbiddenException('Access denied: Admins only');
    }
    return this.usersService.updatePermissions(id, body.permissions);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  async deleteUser(@Req() req: any, @Param('id') id: string) {
    if (req.user['role'] !== 'ADMIN') {
      throw new ForbiddenException('Access denied: Admins only');
    }
    return this.usersService.deleteUser(id);
  }
}
