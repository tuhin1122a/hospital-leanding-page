import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Patient, Prisma } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class PatientsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(data: Prisma.PatientCreateInput): Promise<Patient> {
    // Generate unique patientId NH-XXXX
    const count = await this.prisma.patient.count();
    const patientId = `NH-${1001 + count}`;
    const patient = await this.prisma.patient.create({
      data: {
        ...data,
        patientId,
      },
    });

    // Notify Admin
    const admin = await this.prisma.user.findFirst({
      where: { role: 'ADMIN' },
    });
    if (admin) {
      await this.notificationsService.create({
        userId: admin.id,
        title: 'New Patient Registered',
        message: `${patient.name} has been added to the registry (ID: ${patientId})`,
        type: 'SUCCESS',
      });
    }

    return patient;
  }

  async findAll() {
    return this.prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        admissions: true,
        appointments: true,
        billings: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.patient.findUnique({
      where: { id },
      include: {
        admissions: true,
        appointments: true,
        billings: true,
        records: true,
        labTests: true,
      },
    });
  }

  async update(id: string, data: Prisma.PatientUpdateInput) {
    return this.prisma.patient.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.patient.delete({ where: { id } });
  }

  async addRecord(patientId: string, data: any) {
    return this.prisma.medicalRecord.create({
      data: {
        ...data,
        patientId,
      },
    });
  }
}
