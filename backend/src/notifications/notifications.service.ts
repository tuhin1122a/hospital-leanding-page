import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppGateway } from '../gateways/app.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    private appGateway: AppGateway,
  ) {}

  async create(data: {
    userId?: string;
    title: string;
    message: string;
    type?: string;
  }) {
    const notification = await this.prisma.notification.create({
      data,
    });

    if (data.userId) {
      this.appGateway.sendToUser(data.userId, 'newNotification', notification);
    } else {
      // Broadcast to all ADMINs
      const admins = await this.prisma.user.findMany({
        where: { role: 'ADMIN' },
      });
      admins.forEach((admin) => {
        this.appGateway.sendToUser(admin.id, 'newNotification', notification);
      });
    }

    return notification;
  }

  async findAll(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (user?.role === 'ADMIN') {
      return this.prisma.notification.findMany({
        where: {
          OR: [
            { userId },
            { userId: null }, // Global system notifications
          ],
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
    } else {
      // Non-admins only get direct notifications/messages
      return this.prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
    }
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  }
}
