import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SalaryService {
  constructor(private prisma: PrismaService) {}

  async paySalary(userId: string, amount: number, month: number, year: number, note?: string) {
    // Check if salary already paid for this month/year for this user
    const existing = await this.prisma.salary.findFirst({
      where: {
        userId,
        month,
        year,
        status: 'PAID',
      },
    });

    if (existing) {
      throw new ConflictException(`Salary for ${month}/${year} already paid to this user.`);
    }

    return this.prisma.salary.create({
      data: {
        userId,
        amount,
        month,
        year,
        status: 'PAID',
        note,
        paymentDate: new Date(),
      },
    });
  }

  async getAllSalaries() {
    return this.prisma.salary.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            profilePic: true,
          },
        },
      },
      orderBy: { paymentDate: 'desc' },
    });
  }

  async getUserSalaries(userId: string) {
    return this.prisma.salary.findMany({
      where: { userId },
      orderBy: { paymentDate: 'desc' },
    });
  }

  async setBaseSalary(userId: string, amount: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { baseSalary: amount },
    });
  }

  async getStaffSalaries() {
    // Get all users who are not patients/normal users to show in management list
    return this.prisma.user.findMany({
      where: {
        role: {
          notIn: ['USER', 'PATIENT'],
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        baseSalary: true,
        profilePic: true,
      },
    });
  }
}
