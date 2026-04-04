import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    uploadProfilePic(req: any, file: Express.Multer.File): Promise<{
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
}
