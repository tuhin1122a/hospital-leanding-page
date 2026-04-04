import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('profile-pic')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePic(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    const userId = req.user['sub'];
    return this.usersService.uploadProfilePic(userId, file);
  }
}
