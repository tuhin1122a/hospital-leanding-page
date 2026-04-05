"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let AppointmentsService = class AppointmentsService {
    prisma;
    notificationsService;
    constructor(prisma, notificationsService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
    async create(data) {
        const count = await this.prisma.appointment.count({
            where: {
                appointmentDate: {
                    gte: new Date(new Date(data.appointmentDate).setHours(0, 0, 0, 0)),
                    lte: new Date(new Date(data.appointmentDate).setHours(23, 59, 59, 999)),
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
        const patientName = appointment.patient?.name || `ID: ${data.patientId}`;
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
    async updateStatus(id, status) {
        return this.prisma.appointment.update({
            where: { id },
            data: { status },
        });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map