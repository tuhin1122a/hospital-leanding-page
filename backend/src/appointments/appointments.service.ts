import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Appointment, Prisma } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AppointmentUncheckedCreateInput): Promise<Appointment> {
    const count = await this.prisma.appointment.count({
      where: {
        appointmentDate: {
          gte: new Date(new Date(data.appointmentDate).setHours(0, 0, 0, 0)),
          lte: new Date(new Date(data.appointmentDate).setHours(23, 59, 59, 999)),
        },
        doctorName: data.doctorName,
      },
    });
    
    return this.prisma.appointment.create({
      data: {
        ...data,
        serialNo: count + 1,
        status: 'PENDING',
      },
    });
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
