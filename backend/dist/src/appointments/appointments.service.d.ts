import { PrismaService } from '../prisma.service';
import { Appointment, Prisma } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
export declare class AppointmentsService {
    private prisma;
    private notificationsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    create(data: Prisma.AppointmentUncheckedCreateInput): Promise<Appointment>;
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
        doctorName: string;
        department: string;
        appointmentDate: Date;
        serialNo: number | null;
        fee: number;
    })[]>;
    updateStatus(id: string, status: string): Promise<{
        id: string;
        status: string;
        patientId: string;
        doctorName: string;
        department: string;
        appointmentDate: Date;
        serialNo: number | null;
        fee: number;
    }>;
}
