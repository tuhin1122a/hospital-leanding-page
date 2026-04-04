import { BillingService } from './billing.service';
export declare class BillingController {
    private readonly billingService;
    constructor(billingService: BillingService);
    create(createBillingDto: any): Promise<{
        id: string;
        patientId: string;
        invoiceNo: string;
        totalAmount: number;
        discount: number;
        paidAmount: number;
        dueAmount: number;
        status: string;
        items: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
    }>;
    findAll(): Promise<({
        patient: {
            name: string;
            id: string;
            patientId: string;
            createdAt: Date;
            email: string | null;
            phone: string;
            gender: string;
            age: number;
            bloodGroup: string | null;
            address: string | null;
            updatedAt: Date;
        };
    } & {
        id: string;
        patientId: string;
        invoiceNo: string;
        totalAmount: number;
        discount: number;
        paidAmount: number;
        dueAmount: number;
        status: string;
        items: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
    })[]>;
    update(id: string, updateBillingDto: any): Promise<{
        id: string;
        patientId: string;
        invoiceNo: string;
        totalAmount: number;
        discount: number;
        paidAmount: number;
        dueAmount: number;
        status: string;
        items: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
    }>;
}
