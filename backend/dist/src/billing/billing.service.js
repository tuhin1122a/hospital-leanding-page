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
exports.BillingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let BillingService = class BillingService {
    prisma;
    notificationsService;
    constructor(prisma, notificationsService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
    async create(data) {
        const count = await this.prisma.billing.count();
        const invoiceNo = `INV-${2001 + count}`;
        const billing = await this.prisma.billing.create({
            data: {
                ...data,
                invoiceNo,
                dueAmount: data.totalAmount - (data.paidAmount || 0) - (data.discount || 0),
                status: this.calculateStatus(data.totalAmount, data.paidAmount, data.discount),
            },
            include: { patient: true },
        });
        const patientName = billing.patient?.name || `ID: ${data.patientId}`;
        if (data.paidAmount && data.paidAmount > 0) {
            await this.notificationsService.create({
                title: 'Payment Received',
                message: `Payment of $${data.paidAmount} received from ${patientName} for Invoice ${invoiceNo}.`,
                type: 'SUCCESS',
            });
        }
        else {
            await this.notificationsService.create({
                title: 'Invoice Generated',
                message: `Invoice ${invoiceNo} generated for ${patientName} with total $${data.totalAmount}.`,
                type: 'INFO',
            });
        }
        return billing;
    }
    calculateStatus(total, paid = 0, discount = 0) {
        const remaining = total - paid - discount;
        if (remaining <= 0)
            return 'PAID';
        if (paid > 0)
            return 'PARTIAL';
        return 'UNPAID';
    }
    async findAll() {
        return this.prisma.billing.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                patient: true,
            },
        });
    }
    async update(id, data) {
        const billing = await this.prisma.billing.findUnique({ where: { id } });
        if (!billing)
            throw new Error('Billing not found');
        const totalAmount = data.totalAmount ?? billing.totalAmount;
        const paidAmount = data.paidAmount ?? billing.paidAmount;
        const discount = data.discount ?? billing.discount;
        const dueAmount = totalAmount - paidAmount - discount;
        const status = this.calculateStatus(totalAmount, paidAmount, discount);
        const updatedBilling = await this.prisma.billing.update({
            where: { id },
            data: {
                ...data,
                dueAmount,
                status,
            },
        });
        if (data.paidAmount) {
            await this.notificationsService.create({
                title: 'Payment Updated',
                message: `Payment of $${data.paidAmount} added for Invoice ${billing.invoiceNo}.`,
                type: 'SUCCESS',
            });
        }
        return updatedBilling;
    }
};
exports.BillingService = BillingService;
exports.BillingService = BillingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], BillingService);
//# sourceMappingURL=billing.service.js.map