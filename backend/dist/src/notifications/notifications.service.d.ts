import { PrismaService } from '../prisma.service';
import { AppGateway } from '../gateways/app.gateway';
export declare class NotificationsService {
    private prisma;
    private appGateway;
    constructor(prisma: PrismaService, appGateway: AppGateway);
    create(data: {
        userId?: string;
        title: string;
        message: string;
        type?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        userId: string | null;
        title: string;
        type: string;
        read: boolean;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        userId: string | null;
        title: string;
        type: string;
        read: boolean;
    }[]>;
    markAsRead(id: string): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        userId: string | null;
        title: string;
        type: string;
        read: boolean;
    }>;
    markAllAsRead(userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
