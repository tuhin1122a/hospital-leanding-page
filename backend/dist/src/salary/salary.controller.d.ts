import { SalaryService } from './salary.service';
export declare class SalaryController {
    private readonly salaryService;
    constructor(salaryService: SalaryService);
    getStaff(req: any): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        profilePic: string | null;
        baseSalary: number | null;
    }[]>;
    paySalary(req: any, data: {
        userId: string;
        amount: number;
        month: number;
        year: number;
        note?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        month: number;
        year: number;
        status: string;
        note: string | null;
        paymentDate: Date;
        userId: string;
    }>;
    setBase(req: any, data: {
        userId: string;
        amount: number;
    }): Promise<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        permissions: string[];
        profilePic: string | null;
        refreshToken: string | null;
        twoFactorSecret: string | null;
        twoFactorEnabled: boolean;
        lastActive: Date | null;
        createdAt: Date;
        updatedAt: Date;
        baseSalary: number | null;
    }>;
    getHistory(req: any): Promise<({
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
            profilePic: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        month: number;
        year: number;
        status: string;
        note: string | null;
        paymentDate: Date;
        userId: string;
    })[]>;
    getMySalary(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        month: number;
        year: number;
        status: string;
        note: string | null;
        paymentDate: Date;
        userId: string;
    }[]>;
}
