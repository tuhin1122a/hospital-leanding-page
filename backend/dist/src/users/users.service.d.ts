import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadProfilePic(userId: string, file: Express.Multer.File): Promise<User>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    generate2FASecret(userId: string): Promise<{
        secret: string;
        qrCode: string;
    }>;
    verify2FA(userId: string, token: string): Promise<{
        message: string;
    }>;
    disable2FA(userId: string): Promise<{
        message: string;
    }>;
    getLoginHistory(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        ip: string | null;
        userAgent: string | null;
        device: string | null;
        browser: string | null;
        os: string | null;
        success: boolean;
    }[]>;
    recordLogin(userId: string, meta: {
        ip?: string;
        userAgent?: string;
        success?: boolean;
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        ip: string | null;
        userAgent: string | null;
        device: string | null;
        browser: string | null;
        os: string | null;
        success: boolean;
    }>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
    getAllUsers(): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        permissions: string[];
        profilePic: string | null;
        twoFactorEnabled: boolean;
        createdAt: Date;
    }[]>;
    createUser(data: {
        name: string;
        email: string;
        password: string;
        role: string;
        permissions?: string[];
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
    updatePermissions(id: string, permissions: string[]): Promise<{
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
    deleteUser(id: string): Promise<{
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
}
