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
    signIn(data: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<{
        name: string | null;
        id: string;
        email: string;
        password: string;
        role: string;
        profilePic: string | null;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    refreshTokens(userId: string, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getMe(userId: string): Promise<{
        name: string | null;
        id: string;
        email: string;
        role: string;
        profilePic: string | null;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    private hashData;
    private updateRefreshToken;
    private getTokens;
}
