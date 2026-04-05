import { AppointmentsService } from './appointments.service';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(createDto: any): Promise<{
        id: string;
        status: string;
        patientId: string;
        doctorName: string;
        department: string;
        appointmentDate: Date;
        serialNo: number | null;
        fee: number;
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
