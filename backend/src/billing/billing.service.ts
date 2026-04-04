import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Billing, Prisma } from '@prisma/client';

@Injectable()
export class BillingService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BillingUncheckedCreateInput): Promise<Billing> {
    const count = await this.prisma.billing.count();
    const invoiceNo = `INV-${2001 + count}`;
    return this.prisma.billing.create({
      data: {
        ...data,
        invoiceNo,
        dueAmount: data.totalAmount - (data.paidAmount || 0) - (data.discount || 0),
        status: this.calculateStatus(data.totalAmount, data.paidAmount, data.discount),
      },
    });
  }

  private calculateStatus(total: number, paid: number = 0, discount: number = 0): string {
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

    return this.prisma.billing.update({
      where: { id },
      data: {
        ...data,
        dueAmount,
        status,
      },
    });
  }
}
