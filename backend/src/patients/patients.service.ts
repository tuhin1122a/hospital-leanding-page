import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Patient, Prisma } from '@prisma/client';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PatientCreateInput): Promise<Patient> {
    // Generate unique patientId NH-XXXX
    const count = await this.prisma.patient.count();
    const patientId = `NH-${1001 + count}`;
    return this.prisma.patient.create({
      data: {
        ...data,
        patientId,
      },
    });
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
}
