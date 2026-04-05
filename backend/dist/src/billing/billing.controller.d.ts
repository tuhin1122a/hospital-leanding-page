import { BillingService } from './billing.service';
export declare class BillingController {
    private readonly billingService;
    constructor(billingService: BillingService);
    create(createBillingDto: any): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        patientId: string;
        invoiceNo: string;
        totalAmount: number;
        discount: number;
        paidAmount: number;
        dueAmount: number;
        items: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    findAll(): Promise<({
        patient: {
            id: string;
            email: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            phone: string;
            gender: string;
            age: number;
            bloodGroup: string | null;
            address: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        status: string;
        patientId: string;
        invoiceNo: string;
        totalAmount: number;
        discount: number;
        paidAmount: number;
        dueAmount: number;
        items: import("@prisma/client/runtime/library").JsonValue | null;
    })[]>;
    update(id: string, updateBillingDto: any): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        patientId: string;
        invoiceNo: string;
        totalAmount: number;
        discount: number;
        paidAmount: number;
        dueAmount: number;
        items: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
