import { PatientsService } from './patients.service';
export default class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    create(createPatientDto: any): Promise<{
        name: string;
        id: string;
        patientId: string;
        email: string | null;
        phone: string;
        gender: string;
        age: number;
        bloodGroup: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
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
            items: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
    } & {
        name: string;
        id: string;
        patientId: string;
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
            items: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
    } & {
        name: string;
        id: string;
        patientId: string;
        email: string | null;
        phone: string;
        gender: string;
        age: number;
        bloodGroup: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    update(id: string, updatePatientDto: any): Promise<{
        name: string;
        id: string;
        patientId: string;
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
        name: string;
        id: string;
        patientId: string;
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
