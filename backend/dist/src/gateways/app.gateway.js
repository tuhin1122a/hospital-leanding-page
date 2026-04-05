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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let AppGateway = class AppGateway {
    prisma;
    server;
    constructor(prisma) {
        this.prisma = prisma;
    }
    userSockets = new Map();
    handleConnection(client) {
        const userId = client.handshake.query.userId;
        if (userId) {
            this.userSockets.set(userId, client.id);
            console.log(`User connected: ${userId} with socket: ${client.id}`);
            this.broadcast('userStatus', { userId, status: 'online' });
        }
    }
    async handleDisconnect(client) {
        for (const [userId, socketId] of this.userSockets.entries()) {
            if (socketId === client.id) {
                this.userSockets.delete(userId);
                console.log(`User disconnected: ${userId}`);
                const lastActive = new Date();
                this.broadcast('userStatus', {
                    userId,
                    status: 'offline',
                    lastActive,
                });
                await this.prisma.user
                    .update({
                    where: { id: userId },
                    data: { lastActive },
                })
                    .catch(() => { });
                break;
            }
        }
    }
    sendToUser(userId, event, data) {
        const socketId = this.userSockets.get(userId);
        if (socketId) {
            this.server.to(socketId).emit(event, data);
        }
    }
    broadcast(event, data) {
        this.server.emit(event, data);
    }
    handleMessage(client, data) {
        console.log(`Message from ${data.from} to ${data.to}: ${data.message}`);
        this.sendToUser(data.to, 'newMessage', {
            from: data.from,
            senderName: data.senderName,
            message: data.message,
            createdAt: new Date(),
        });
    }
    isUserOnline(userId) {
        return this.userSockets.has(userId);
    }
};
exports.AppGateway = AppGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleMessage", null);
exports.AppGateway = AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppGateway);
//# sourceMappingURL=app.gateway.js.map