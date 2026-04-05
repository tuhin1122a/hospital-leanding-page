"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let StatsService = class StatsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardOverview() {
        const totalEarnings = await this.prisma.billing.aggregate({
            _sum: {
                paidAmount: true
            }
        });
        const staffSalaries = await this.prisma.salary.aggregate({
            _sum: {
                amount: true
            }
        });
        const patientCount = await this.prisma.patient.count();
        const earnings = totalEarnings._sum.paidAmount || 0;
        const salaries = staffSalaries._sum.amount || 0;
        const netProfit = earnings - salaries;
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
    getColorForDept(dept) {
        const colors = {
            'Cardiology': '#0ea5e9',
            'Neurology': '#6366f1',
            'Orthopedics': '#10b981',
            'Oncology': '#f59e0b',
            'Pediatrics': '#ec4899',
            'ENT': '#a855f7'
        };
        return colors[dept] || '#64748b';
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatsService);
//# sourceMappingURL=stats.service.js.map