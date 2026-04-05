import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(data: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signin(data: any, req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    } | {
        requiresTwoFactor: boolean;
        userId: string;
    }>;
    signinTwoFactor(body: {
        userId: string;
        token: string;
    }, req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    forgotPassword(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    verifyResetOtp(body: {
        email: string;
        otp: string;
    }): Promise<{
        message: string;
    }>;
    resetPassword(body: {
        email: string;
        otp: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    logout(req: any): Promise<{
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
    refreshTokens(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    me(req: any): Promise<{
        id: string;
        email: string;
        name: string | null;
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
    } | null>;
}
