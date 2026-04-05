import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Appointment, Prisma } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AppointmentsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(
    data: Prisma.AppointmentUncheckedCreateInput,
  ): Promise<Appointment> {
    const count = await this.prisma.appointment.count({
      where: {
        appointmentDate: {
          gte: new Date(new Date(data.appointmentDate).setHours(0, 0, 0, 0)),
          lte: new Date(
            new Date(data.appointmentDate).setHours(23, 59, 59, 999),
          ),
        },
        doctorName: data.doctorName,
      },
    });

    const appointment = await this.prisma.appointment.create({
      data: {
        ...data,
        serialNo: count + 1,
        status: 'PENDING',
      },
      include: { patient: true },
    });

    const patientName =
      (appointment as any).patient?.name || `ID: ${data.patientId}`;
    await this.notificationsService.create({
      title: 'Appointment Booked',
      message: `New appointment scheduled for ${patientName} with Dr. ${data.doctorName} on ${new Date(data.appointmentDate).toLocaleDateString()}.`,
      type: 'INFO',
    });

    return appointment;
  }

  async findAll() {
    return this.prisma.appointment.findMany({
      orderBy: { appointmentDate: 'desc' },
      include: {
        patient: true,
      },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.appointment.update({
      where: { id },
      data: { status },
    });
  }
}
