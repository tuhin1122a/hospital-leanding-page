import { AppointmentsService } from './appointments.service';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(createDto: any): Promise<{
        id: string;
        patientId: string;
        doctorName: string;
        department: string;
        appointmentDate: Date;
        serialNo: number | null;
        status: string;
        fee: number;
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
