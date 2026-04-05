import { PrismaService } from '../prisma.service';
export declare class SalaryService {
    private prisma;
    constructor(prisma: PrismaService);
    paySalary(userId: string, amount: number, month: number, year: number, note?: string): Promise<{
        id: string;
        amount: number;
        month: number;
        year: number;
        status: string;
        note: string | null;
        paymentDate: Date;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    getAllSalaries(): Promise<({
        user: {
            id: string;
            name: string | null;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            profilePic: string | null;
        };
    } & {
        id: string;
        amount: number;
        month: number;
        year: number;
        status: string;
        note: string | null;
        paymentDate: Date;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    })[]>;
    getUserSalaries(userId: string): Promise<{
        id: string;
        amount: number;
        month: number;
        year: number;
        status: string;
        note: string | null;
        paymentDate: Date;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }[]>;
    setBaseSalary(userId: string, amount: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        permissions: string[];
        profilePic: string | null;
        refreshToken: string | null;
        twoFactorSecret: string | null;
        twoFactorEnabled: boolean;
        lastActive: Date | null;
        baseSalary: number | null;
    }>;
    getStaffSalaries(): Promise<{
        id: string;
        name: string | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        profilePic: string | null;
        baseSalary: number | null;
    }[]>;
}
