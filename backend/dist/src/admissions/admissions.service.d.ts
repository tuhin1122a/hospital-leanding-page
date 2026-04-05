import { PrismaService } from '../prisma.service';
import { Admission, Prisma } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
export declare class AdmissionsService {
    private prisma;
    private notificationsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    create(data: Prisma.AdmissionUncheckedCreateInput): Promise<Admission>;
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
        status: string;
        patientId: string;
        admissionDate: Date;
        dischargeDate: Date | null;
        wardNo: string;
        bedNo: string;
        doctorInCharge: string;
        reason: string | null;
    })[]>;
    discharge(id: string): Promise<{
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
        status: string;
        patientId: string;
        admissionDate: Date;
        dischargeDate: Date | null;
        wardNo: string;
        bedNo: string;
        doctorInCharge: string;
        reason: string | null;
    }>;
}
