import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Admission, Prisma } from '@prisma/client';

@Injectable()
export class AdmissionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AdmissionUncheckedCreateInput): Promise<Admission> {
    return this.prisma.admission.create({
      data: {
        ...data,
        status: 'ADMITTED',
      },
    });
  }

  async findAll() {
    return this.prisma.admission.findMany({
      where: { status: 'ADMITTED' },
      include: {
        patient: true,
      },
    });
  }

  async discharge(id: string) {
    return this.prisma.admission.update({
      where: { id },
      data: {
        status: 'DISCHARGED',
        dischargeDate: new Date(),
      },
    });
  }
}
