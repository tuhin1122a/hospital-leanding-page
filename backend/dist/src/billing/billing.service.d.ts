import { PrismaService } from '../prisma.service';
import { Billing, Prisma } from '@prisma/client';
export declare class BillingService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.BillingUncheckedCreateInput): Promise<Billing>;
    private calculateStatus;
    findAll(): Promise<({
        patient: {
            id: string;
            patientId: string;
            createdAt: Date;
            name: string;
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
        items: Prisma.JsonValue | null;
        createdAt: Date;
    })[]>;
    update(id: string, data: any): Promise<{
        id: string;
        patientId: string;
        invoiceNo: string;
        totalAmount: number;
        discount: number;
        paidAmount: number;
        dueAmount: number;
        status: string;
        items: Prisma.JsonValue | null;
        createdAt: Date;
    }>;
}
