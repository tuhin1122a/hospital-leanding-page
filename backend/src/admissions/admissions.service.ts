import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Admission, Prisma } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AdmissionsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(data: Prisma.AdmissionUncheckedCreateInput): Promise<Admission> {
    const admission = await this.prisma.admission.create({
      data: {
        ...data,
        status: 'ADMITTED',
      },
      include: { patient: true },
    });

    const patientName =
      (admission as any).patient?.name || `ID: ${data.patientId}`;
    await this.notificationsService.create({
      title: 'Patient Admitted',
      message: `Patient ${patientName} has been admitted to Ward ${data.wardNo}, Bed ${data.bedNo} under Dr. ${data.doctorInCharge}.`,
      type: 'INFO',
    });

    return admission;
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
    const admission = await this.prisma.admission.update({
      where: { id },
      data: {
        status: 'DISCHARGED',
        dischargeDate: new Date(),
      },
      include: { patient: true },
    });

    const patientName =
      (admission as any).patient?.name || `ID: ${admission.patientId}`;
    await this.notificationsService.create({
      title: 'Patient Discharged',
      message: `Patient ${patientName} has been discharged from Ward ${admission.wardNo}.`,
      type: 'SUCCESS',
    });

    return admission;
  }
}
