import { PrismaService } from '../prisma.service';
export declare class StatsService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardOverview(): Promise<{
        earnings: number;
        salaries: number;
        patients: number;
        netProfit: number;
        activeStaff: {
            id: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
            profilePic: string | null;
        }[];
        monthlyHistory: {
            name: string;
            patients: number;
            revenue: number;
        }[];
        departmentLoad: {
            name: string;
            value: number;
            color: string;
        }[];
    }>;
    private getColorForDept;
}
