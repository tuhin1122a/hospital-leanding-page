import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getOverview(req: any): Promise<{
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
}
