import { PrismaService } from '../prisma.service';
import { Admission, Prisma } from '@prisma/client';
export declare class AdmissionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.AdmissionUncheckedCreateInput): Promise<Admission>;
    findAll(): Promise<({
        patient: {
            id: string;
            patientId: string;
            name: string;
            email: string | null;
            phone: string;
            gender: string;
            age: number;
            bloodGroup: string | null;
            address: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        patientId: string;
        admissionDate: Date;
        dischargeDate: Date | null;
        wardNo: string;
        bedNo: string;
        doctorInCharge: string;
        status: string;
        reason: string | null;
    })[]>;
    discharge(id: string): Promise<{
        id: string;
        patientId: string;
        admissionDate: Date;
        dischargeDate: Date | null;
        wardNo: string;
        bedNo: string;
        doctorInCharge: string;
        status: string;
        reason: string | null;
    }>;
}
