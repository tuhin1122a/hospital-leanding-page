import { ApprovalsService } from './approvals.service';
export declare class ApprovalsController {
    private readonly approvalsService;
    constructor(approvalsService: ApprovalsService);
    create(createDto: any): Promise<{
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
