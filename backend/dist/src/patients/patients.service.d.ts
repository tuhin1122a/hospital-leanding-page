import { PrismaService } from '../prisma.service';
import { Patient, Prisma } from '@prisma/client';
export declare class PatientsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.PatientCreateInput): Promise<Patient>;
    findAll(): Promise<({
        admissions: {
            id: string;
            patientId: string;
            admissionDate: Date;
            dischargeDate: Date | null;
            wardNo: string;
            bedNo: string;
            doctorInCharge: string;
            status: string;
            reason: string | null;
        }[];
        appointments: {
            id: string;
            patientId: string;
            status: string;
            doctorName: string;
            department: string;
            appointmentDate: Date;
            serialNo: number | null;
            fee: number;
        }[];
        billings: {
            id: string;
            patientId: string;
            createdAt: Date;
            status: string;
            invoiceNo: string;
            totalAmount: number;
            discount: number;
            paidAmount: number;
            dueAmount: number;
            items: Prisma.JsonValue | null;
        }[];
    } & {
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
    })[]>;
    findOne(id: string): Promise<({
        admissions: {
            id: string;
            patientId: string;
            admissionDate: Date;
            dischargeDate: Date | null;
            wardNo: string;
            bedNo: string;
            doctorInCharge: string;
            status: string;
            reason: string | null;
        }[];
        appointments: {
            id: string;
            patientId: string;
            status: string;
            doctorName: string;
            department: string;
            appointmentDate: Date;
            serialNo: number | null;
            fee: number;
        }[];
        billings: {
            id: string;
            patientId: string;
            createdAt: Date;
            status: string;
            invoiceNo: string;
            totalAmount: number;
            discount: number;
            paidAmount: number;
            dueAmount: number;
            items: Prisma.JsonValue | null;
        }[];
    } & {
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
    }) | null>;
    update(id: string, data: Prisma.PatientUpdateInput): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
