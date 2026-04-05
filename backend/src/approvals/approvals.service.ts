import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ApprovalRequest, Prisma } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ApprovalsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(
    data: Prisma.ApprovalRequestUncheckedCreateInput,
  ): Promise<ApprovalRequest> {
    return this.prisma.approvalRequest.create({
      data: {
        ...data,
        status: 'PENDING',
      },
    });
  }

  async findAll() {
    return this.prisma.approvalRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: string) {
    const request = await this.prisma.approvalRequest.update({
      where: { id },
      data: {
        status,
        actionDate: new Date(),
      },
    });

    // Send notification to requester
    await this.notificationsService.create({
      userId: request.requestedBy,
      title: 'Approval Update',
      message: `Your ${request.type} request has been ${status.toLowerCase()}`,
      type: status === 'APPROVED' ? 'SUCCESS' : 'WARNING',
    });

    return request;
  }
}
