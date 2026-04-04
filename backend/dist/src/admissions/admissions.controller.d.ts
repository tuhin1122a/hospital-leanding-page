import { AdmissionsService } from './admissions.service';
export declare class AdmissionsController {
    private readonly admissionsService;
    constructor(admissionsService: AdmissionsService);
    create(createAdmissionDto: any): Promise<{
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
    findAll(): Promise<({
        patient: {
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
