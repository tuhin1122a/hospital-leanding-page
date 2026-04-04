import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    uploadProfilePic(req: any, file: Express.Multer.File): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
    }>;
    changePassword(req: any, body: {
        currentPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    generate2FA(req: any): Promise<{
        secret: string;
        qrCode: string;
    }>;
    verify2FA(req: any, body: {
        token: string;
    }): Promise<{
        message: string;
    }>;
    disable2FA(req: any): Promise<{
        message: string;
    }>;
    getLoginHistory(req: any): Promise<{
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
    getAllUsers(req: any): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        permissions: string[];
        profilePic: string | null;
        twoFactorEnabled: boolean;
        createdAt: Date;
    }[]>;
    createUser(req: any, body: {
        name: string;
        email: string;
        password: string;
        role: string;
        permissions: string[];
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
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatePermissions(req: any, id: string, body: {
        permissions: string[];
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
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(req: any, id: string): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
    }>;
}
