import { AdmissionsService } from './admissions.service';
export declare class AdmissionsController {
    private readonly admissionsService;
    constructor(admissionsService: AdmissionsService);
    create(createAdmissionDto: any): Promise<{
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
