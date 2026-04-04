import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signUp(data: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signIn(data: any, meta?: {
        ip?: string;
        userAgent?: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    } | {
        requiresTwoFactor: boolean;
        userId: string;
    }>;
    verifyLoginTwoFactor(userId: string, token: string, meta?: {
        ip?: string;
        userAgent?: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<{
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
    generateResetOtp(email: string): Promise<{
        message: string;
    }>;
    verifyResetOtp(email: string, otp: string): Promise<{
        message: string;
    }>;
    resetPassword(email: string, otp: string, newPassword: string): Promise<{
        message: string;
    }>;
    refreshTokens(userId: string, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getMe(userId: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        permissions: string[];
        profilePic: string | null;
        refreshToken: string | null;
        twoFactorSecret: string | null;
        twoFactorEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    private hashData;
    private updateRefreshToken;
    private getTokens;
}
