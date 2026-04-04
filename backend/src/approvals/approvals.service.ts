import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ApprovalRequest, Prisma } from '@prisma/client';

@Injectable()
export class ApprovalsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ApprovalRequestUncheckedCreateInput): Promise<ApprovalRequest> {
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
    return this.prisma.approvalRequest.update({
      where: { id },
      data: {
        status,
        actionDate: new Date(),
      },
    });
  }
}
