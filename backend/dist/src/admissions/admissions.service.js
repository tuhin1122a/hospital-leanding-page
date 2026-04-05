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
exports.AdmissionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let AdmissionsService = class AdmissionsService {
    prisma;
    notificationsService;
    constructor(prisma, notificationsService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
    async create(data) {
        const admission = await this.prisma.admission.create({
            data: {
                ...data,
                status: 'ADMITTED',
            },
            include: { patient: true },
        });
        const patientName = admission.patient?.name || `ID: ${data.patientId}`;
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
    async discharge(id) {
        const admission = await this.prisma.admission.update({
            where: { id },
            data: {
                status: 'DISCHARGED',
                dischargeDate: new Date(),
            },
            include: { patient: true },
        });
        const patientName = admission.patient?.name || `ID: ${admission.patientId}`;
        await this.notificationsService.create({
            title: 'Patient Discharged',
            message: `Patient ${patientName} has been discharged from Ward ${admission.wardNo}.`,
            type: 'SUCCESS',
        });
        return admission;
    }
};
exports.AdmissionsService = AdmissionsService;
exports.AdmissionsService = AdmissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], AdmissionsService);
//# sourceMappingURL=admissions.service.js.map