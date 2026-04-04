import { PrismaService } from '../prisma.service';
import { Appointment, Prisma } from '@prisma/client';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.AppointmentUncheckedCreateInput): Promise<Appointment>;
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
        doctorName: string;
        department: string;
        appointmentDate: Date;
        serialNo: number | null;
        status: string;
        fee: number;
    })[]>;
    updateStatus(id: string, status: string): Promise<{
        id: string;
        patientId: string;
        doctorName: string;
        department: string;
        appointmentDate: Date;
        serialNo: number | null;
        status: string;
        fee: number;
    }>;
}
