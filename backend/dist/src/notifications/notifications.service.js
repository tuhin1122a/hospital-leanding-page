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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const app_gateway_1 = require("../gateways/app.gateway");
let NotificationsService = class NotificationsService {
    prisma;
    appGateway;
    constructor(prisma, appGateway) {
        this.prisma = prisma;
        this.appGateway = appGateway;
    }
    async create(data) {
        const notification = await this.prisma.notification.create({
            data,
        });
        if (data.userId) {
            this.appGateway.sendToUser(data.userId, 'newNotification', notification);
        }
        else {
            const admins = await this.prisma.user.findMany({
                where: { role: 'ADMIN' },
            });
            admins.forEach((admin) => {
                this.appGateway.sendToUser(admin.id, 'newNotification', notification);
            });
        }
        return notification;
    }
    async findAll(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (user?.role === 'ADMIN') {
            return this.prisma.notification.findMany({
                where: {
                    OR: [
                        { userId },
                        { userId: null },
                    ],
                },
                orderBy: { createdAt: 'desc' },
                take: 50,
            });
        }
        else {
            return this.prisma.notification.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                take: 50,
            });
        }
    }
    async markAsRead(id) {
        return this.prisma.notification.update({
            where: { id },
            data: { read: true },
        });
    }
    async markAllAsRead(userId) {
        return this.prisma.notification.updateMany({
            where: { userId, read: false },
            data: { read: true },
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        app_gateway_1.AppGateway])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map