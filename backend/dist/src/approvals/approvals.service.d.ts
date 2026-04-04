import { PrismaService } from '../prisma.service';
import { ApprovalRequest, Prisma } from '@prisma/client';
export declare class ApprovalsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ApprovalRequestUncheckedCreateInput): Promise<ApprovalRequest>;
    findAll(): Promise<{
        id: string;
        requestedBy: string;
        type: string;
        description: string;
        amount: number | null;
        status: string;
        referenceId: string | null;
        createdAt: Date;
        actionDate: Date | null;
    }[]>;
    updateStatus(id: string, status: string): Promise<{
        id: string;
        requestedBy: string;
        type: string;
        description: string;
        amount: number | null;
        status: string;
        referenceId: string | null;
        createdAt: Date;
        actionDate: Date | null;
    }>;
}
