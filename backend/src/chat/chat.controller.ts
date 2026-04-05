import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';

@Controller('chat')
@UseGuards(AccessTokenGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  send(@Req() req: any, @Body() data: { to: string; content: string }) {
    return this.chatService.sendMessage(req.user['sub'], data.to, data.content);
  }

  @Get('messages/:contactId')
  getMessages(@Req() req: any, @Param('contactId') contactId: string) {
    return this.chatService.getMessages(req.user['sub'], contactId);
  }

  @Get('recent')
  getRecent(@Req() req: any) {
    return this.chatService.getRecentChats(req.user['sub']);
  }

  @Get('contacts')
  getContacts(@Req() req: any) {
    return this.chatService.getAllContacts(req.user['sub']);
  }

  @Get('unread-count')
  getUnreadCount(@Req() req: any) {
    return this.chatService.getUnreadCount(req.user['sub']);
  }

  @Post('mark-read/:senderId')
  markAsRead(@Req() req: any, @Param('senderId') senderId: string) {
    return this.chatService.markMessagesAsRead(req.user['sub'], senderId);
  }
}
