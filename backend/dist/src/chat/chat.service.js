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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const app_gateway_1 = require("../gateways/app.gateway");
let ChatService = class ChatService {
    prisma;
    appGateway;
    constructor(prisma, appGateway) {
        this.prisma = prisma;
        this.appGateway = appGateway;
    }
    async sendMessage(senderId, receiverId, content) {
        const message = await this.prisma.message.create({
            data: {
                senderId,
                receiverId,
                content,
            },
            include: {
                sender: { select: { name: true, profilePic: true } },
            },
        });
        this.appGateway.sendToUser(receiverId, 'newMessage', {
            id: message.id,
            senderId: message.senderId,
            senderName: message.sender.name,
            senderPic: message.sender.profilePic,
            content: message.content,
            createdAt: message.createdAt,
        });
        return message;
    }
    async getMessages(userId, contactId) {
        return this.prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId, receiverId: contactId },
                    { senderId: contactId, receiverId: userId },
                ],
            },
            orderBy: { createdAt: 'asc' },
            take: 100,
        });
    }
    async getRecentChats(userId) {
        const messages = await this.prisma.message.findMany({
            where: {
                OR: [{ senderId: userId }, { receiverId: userId }],
            },
            orderBy: { createdAt: 'desc' },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        profilePic: true,
                        role: true,
                        lastActive: true,
                    },
                },
                receiver: {
                    select: {
                        id: true,
                        name: true,
                        profilePic: true,
                        role: true,
                        lastActive: true,
                    },
                },
            },
        });
        const contacts = new Map();
        for (const m of messages) {
            const otherUser = m.senderId === userId ? m.receiver : m.sender;
            if (otherUser && !contacts.has(otherUser.id)) {
                const unreadForUser = await this.prisma.message.count({
                    where: {
                        senderId: otherUser.id,
                        receiverId: userId,
                        read: false,
                    },
                });
                contacts.set(otherUser.id, {
                    ...otherUser,
                    isOnline: this.appGateway.isUserOnline(otherUser.id),
                    lastMessage: m.content,
                    lastTime: m.createdAt,
                    unreadCount: unreadForUser,
                    read: m.senderId === userId ? m.read : true,
                });
            }
        }
        return Array.from(contacts.values());
    }
    async getAllContacts(userId) {
        const users = await this.prisma.user.findMany({
            where: { id: { not: userId } },
            select: {
                id: true,
                name: true,
                profilePic: true,
                role: true,
                lastActive: true,
            },
        });
        return users.map((u) => ({
            ...u,
            isOnline: this.appGateway.isUserOnline(u.id),
        }));
    }
    async getUnreadCount(userId) {
        return this.prisma.message.count({
            where: {
                receiverId: userId,
                read: false,
            },
        });
    }
    async markMessagesAsRead(userId, senderId) {
        const updated = await this.prisma.message.updateMany({
            where: {
                receiverId: userId,
                senderId: senderId,
                read: false,
            },
            data: {
                read: true,
            },
        });
        if (updated.count > 0) {
            this.appGateway.sendToUser(senderId, 'messagesRead', {
                byUserId: userId,
            });
        }
        return updated;
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        app_gateway_1.AppGateway])
], ChatService);
//# sourceMappingURL=chat.service.js.map