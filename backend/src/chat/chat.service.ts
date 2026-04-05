import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppGateway } from '../gateways/app.gateway';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private appGateway: AppGateway,
  ) {}

  async sendMessage(senderId: string, receiverId: string, content: string) {
    const message = await this.prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
      include: {
        sender: { select: { name: true, profilePic: true } },
      },
    });

    // Real-time emit
    this.appGateway.sendToUser(receiverId, 'newMessage', {
      id: message.id,
      senderId: message.senderId,
      senderName: message.sender.name,
      senderPic: message.sender.profilePic,
      content: message.content,
      createdAt: message.createdAt,
    });

    return message;
  }

  async getMessages(userId: string, contactId: string) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: contactId },
          { senderId: contactId, receiverId: userId },
        ],
      },
      orderBy: { createdAt: 'asc' },
      take: 100,
    });
  }

  async getRecentChats(userId: string) {
    const messages = await this.prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            profilePic: true,
            role: true,
            lastActive: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            profilePic: true,
            role: true,
            lastActive: true,
          },
        },
      },
    });

    const contacts = new Map();
    for (const m of messages) {
      const otherUser = m.senderId === userId ? m.receiver : m.sender;
      if (otherUser && !contacts.has(otherUser.id)) {
        // Count unread for *this* otherUser
        const unreadForUser = await this.prisma.message.count({
          where: {
            senderId: otherUser.id,
            receiverId: userId,
            read: false,
          },
        });

        contacts.set(otherUser.id, {
          ...otherUser,
          isOnline: this.appGateway.isUserOnline(otherUser.id),
          lastMessage: m.content,
          lastTime: m.createdAt,
          unreadCount: unreadForUser,
          read: m.senderId === userId ? m.read : true, // If i sent it, did they read it?
        });
      }
    }

    return Array.from(contacts.values());
  }

  async getAllContacts(userId: string) {
    const users = await this.prisma.user.findMany({
      where: { id: { not: userId } },
      select: {
        id: true,
        name: true,
        profilePic: true,
        role: true,
        lastActive: true,
      },
    });

    return users.map((u) => ({
      ...u,
      isOnline: this.appGateway.isUserOnline(u.id),
    }));
  }

  async getUnreadCount(userId: string) {
    return this.prisma.message.count({
      where: {
        receiverId: userId,
        read: false,
      },
    });
  }

  async markMessagesAsRead(userId: string, senderId: string) {
    const updated = await this.prisma.message.updateMany({
      where: {
        receiverId: userId,
        senderId: senderId,
        read: false,
      },
      data: {
        read: true,
      },
    });

    if (updated.count > 0) {
      this.appGateway.sendToUser(senderId, 'messagesRead', {
        byUserId: userId,
      });
    }

    return updated;
  }
}
