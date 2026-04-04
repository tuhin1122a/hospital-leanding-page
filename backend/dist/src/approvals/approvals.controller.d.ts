import { ApprovalsService } from './approvals.service';
export declare class ApprovalsController {
    private readonly approvalsService;
    constructor(approvalsService: ApprovalsService);
    create(createDto: any): Promise<{
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
