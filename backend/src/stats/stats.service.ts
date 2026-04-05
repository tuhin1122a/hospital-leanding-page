import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardOverview() {
    // 1. Total Earnings (Sum of paid billings)
    const totalEarnings = await this.prisma.billing.aggregate({
      _sum: {
        paidAmount: true
      }
    });

    // 2. Total Salaries (Sum of paid salaries)
    const staffSalaries = await this.prisma.salary.aggregate({
      _sum: {
        amount: true
      }
    });

    // 3. Total Patients
    const patientCount = await this.prisma.patient.count();

    // 4. Net Profit
    const earnings = totalEarnings._sum.paidAmount || 0;
    const salaries = staffSalaries._sum.amount || 0;
    const netProfit = earnings - salaries;

    // 5. Active Staff (Recent 5 staff members)
    const activeStaff = await this.prisma.user.findMany({
      where: {
        role: {
          notIn: ['USER', 'PATIENT']
        },
        lastActive: {
          not: null
        }
      },
      take: 5,
      orderBy: { lastActive: 'desc' },
      select: {
          id: true,
          name: true,
          profilePic: true,
          role: true
      }
    });

    // 6. Monthly Patient Stats (Area Chart)
    const currentYear = new Date().getFullYear();
    const monthlyStats = await Promise.all([0, 1, 2, 3, 4, 5, 6].map(async (monthOffset) => {
      const month = new Date();
      month.setMonth(month.getMonth() - monthOffset);
      const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
      const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

      const count = await this.prisma.patient.count({
        where: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth
          }
        }
      });

      const revenue = await this.prisma.billing.aggregate({
        where: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth
          }
        },
        _sum: {
          paidAmount: true
        }
      });

      return {
        name: startOfMonth.toLocaleString('default', { month: 'short' }),
        patients: count || 0,
        revenue: revenue._sum.paidAmount || 0
      };
    }));

    // 7. Department Loading (Bar Chart)
    const departments = await this.prisma.appointment.groupBy({
      by: ['department'],
      _count: {
        _all: true
      }
    });

    const deptStats = departments.map(d => ({
        name: d.department,
        value: d._count._all,
        color: this.getColorForDept(d.department)
    }));

    return {
      earnings: earnings,
      salaries: salaries,
      patients: patientCount,
      netProfit: netProfit,
      activeStaff: activeStaff,
      monthlyHistory: monthlyStats.reverse(),
      departmentLoad: deptStats
    };
  }

  private getColorForDept(dept: string) {
    const colors: Record<string, string> = {
      'Cardiology': '#0ea5e9',
      'Neurology': '#6366f1',
      'Orthopedics': '#10b981',
      'Oncology': '#f59e0b',
      'Pediatrics': '#ec4899',
      'ENT': '#a855f7'
    };
    return colors[dept] || '#64748b';
  }
}
