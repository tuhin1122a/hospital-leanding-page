import { PrismaService } from '../prisma.service';
import { AppGateway } from '../gateways/app.gateway';
export declare class ChatService {
    private prisma;
    private appGateway;
    constructor(prisma: PrismaService, appGateway: AppGateway);
    sendMessage(senderId: string, receiverId: string, content: string): Promise<{
        sender: {
            name: string | null;
            profilePic: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        read: boolean;
        content: string;
        receiverId: string | null;
        senderId: string;
    }>;
    getMessages(userId: string, contactId: string): Promise<{
        id: string;
        createdAt: Date;
        read: boolean;
        content: string;
        receiverId: string | null;
        senderId: string;
    }[]>;
    getRecentChats(userId: string): Promise<any[]>;
    getAllContacts(userId: string): Promise<{
        isOnline: boolean;
        id: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        profilePic: string | null;
        lastActive: Date | null;
    }[]>;
    getUnreadCount(userId: string): Promise<number>;
    markMessagesAsRead(userId: string, senderId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
