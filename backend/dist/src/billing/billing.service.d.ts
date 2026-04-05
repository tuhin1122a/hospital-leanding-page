import { PrismaService } from '../prisma.service';
import { Billing, Prisma } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
export declare class BillingService {
    private prisma;
    private notificationsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    create(data: Prisma.BillingUncheckedCreateInput): Promise<Billing>;
    private calculateStatus;
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
        items: Prisma.JsonValue | null;
    })[]>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        patientId: string;
        invoiceNo: string;
        totalAmount: number;
        discount: number;
        paidAmount: number;
        dueAmount: number;
        items: Prisma.JsonValue | null;
    }>;
}
