import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(data: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signin(data: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(req: any): Promise<{
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
    refreshTokens(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    me(req: any): Promise<{
        name: string | null;
        id: string;
        email: string;
        role: string;
        profilePic: string | null;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
