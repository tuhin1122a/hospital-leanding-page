import { PrismaService } from '../prisma.service';
import { ApprovalRequest, Prisma } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
export declare class ApprovalsService {
    private prisma;
    private notificationsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    create(data: Prisma.ApprovalRequestUncheckedCreateInput): Promise<ApprovalRequest>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        amount: number | null;
        status: string;
        description: string;
        requestedBy: string;
        referenceId: string | null;
        actionDate: Date | null;
    }[]>;
    updateStatus(id: string, status: string): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        amount: number | null;
        status: string;
        description: string;
        requestedBy: string;
        referenceId: string | null;
        actionDate: Date | null;
    }>;
}
