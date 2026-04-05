import { PrismaService } from '../prisma.service';
import { Patient, Prisma } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
export declare class PatientsService {
    private prisma;
    private notificationsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    create(data: Prisma.PatientCreateInput): Promise<Patient>;
    findAll(): Promise<({
        admissions: {
            id: string;
            status: string;
            patientId: string;
            admissionDate: Date;
            dischargeDate: Date | null;
            wardNo: string;
            bedNo: string;
            doctorInCharge: string;
            reason: string | null;
        }[];
        appointments: {
            id: string;
            status: string;
            patientId: string;
            doctorName: string;
            department: string;
            appointmentDate: Date;
            serialNo: number | null;
            fee: number;
        }[];
        billings: {
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
        }[];
    } & {
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
    })[]>;
    findOne(id: string): Promise<({
        admissions: {
            id: string;
            status: string;
            patientId: string;
            admissionDate: Date;
            dischargeDate: Date | null;
            wardNo: string;
            bedNo: string;
            doctorInCharge: string;
            reason: string | null;
        }[];
        appointments: {
            id: string;
            status: string;
            patientId: string;
            doctorName: string;
            department: string;
            appointmentDate: Date;
            serialNo: number | null;
            fee: number;
        }[];
        billings: {
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
        }[];
        records: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            doctorId: string | null;
            diagnosis: string;
            symptoms: string | null;
            notes: string | null;
            vitals: Prisma.JsonValue | null;
        }[];
        labTests: {
            id: string;
            result: string | null;
            status: string;
            patientId: string;
            testName: string;
            category: string | null;
            reportUrl: string | null;
            date: Date;
        }[];
    } & {
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
    }) | null>;
    update(id: string, data: Prisma.PatientUpdateInput): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
    addRecord(patientId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        doctorId: string | null;
        diagnosis: string;
        symptoms: string | null;
        notes: string | null;
        vitals: Prisma.JsonValue | null;
    }>;
}
