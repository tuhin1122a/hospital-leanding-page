import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Billing, Prisma } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class BillingService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(data: Prisma.BillingUncheckedCreateInput): Promise<Billing> {
    const count = await this.prisma.billing.count();
    const invoiceNo = `INV-${2001 + count}`;
    const billing = await this.prisma.billing.create({
      data: {
        ...data,
        invoiceNo,
        dueAmount:
          data.totalAmount - (data.paidAmount || 0) - (data.discount || 0),
        status: this.calculateStatus(
          data.totalAmount,
          data.paidAmount,
          data.discount,
        ),
      },
      include: { patient: true },
    });

    const patientName =
      (billing as any).patient?.name || `ID: ${data.patientId}`;
    if (data.paidAmount && data.paidAmount > 0) {
      await this.notificationsService.create({
        title: 'Payment Received',
        message: `Payment of $${data.paidAmount} received from ${patientName} for Invoice ${invoiceNo}.`,
        type: 'SUCCESS',
      });
    } else {
      await this.notificationsService.create({
        title: 'Invoice Generated',
        message: `Invoice ${invoiceNo} generated for ${patientName} with total $${data.totalAmount}.`,
        type: 'INFO',
      });
    }

    return billing;
  }

  private calculateStatus(
    total: number,
    paid: number = 0,
    discount: number = 0,
  ): string {
    const remaining = total - paid - discount;
    if (remaining <= 0) return 'PAID';
    if (paid > 0) return 'PARTIAL';
    return 'UNPAID';
  }

  async findAll() {
    return this.prisma.billing.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        patient: true,
      },
    });
  }

  async update(id: string, data: any) {
    const billing = await this.prisma.billing.findUnique({ where: { id } });
    if (!billing) throw new Error('Billing not found');

    const totalAmount = data.totalAmount ?? billing.totalAmount;
    const paidAmount = data.paidAmount ?? billing.paidAmount;
    const discount = data.discount ?? billing.discount;
    const dueAmount = totalAmount - paidAmount - discount;
    const status = this.calculateStatus(totalAmount, paidAmount, discount);

    const updatedBilling = await this.prisma.billing.update({
      where: { id },
      data: {
        ...data,
        dueAmount,
        status,
      },
    });

    if (data.paidAmount) {
      await this.notificationsService.create({
        title: 'Payment Updated',
        message: `Payment of $${data.paidAmount} added for Invoice ${billing.invoiceNo}.`,
        type: 'SUCCESS',
      });
    }

    return updatedBilling;
  }
}
