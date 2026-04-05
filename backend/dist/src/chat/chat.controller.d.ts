import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    send(req: any, data: {
        to: string;
        content: string;
    }): Promise<{
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
    getMessages(req: any, contactId: string): Promise<{
        id: string;
        createdAt: Date;
        read: boolean;
        content: string;
        receiverId: string | null;
        senderId: string;
    }[]>;
    getRecent(req: any): Promise<any[]>;
    getContacts(req: any): Promise<{
        isOnline: boolean;
        id: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        profilePic: string | null;
        lastActive: Date | null;
    }[]>;
    getUnreadCount(req: any): Promise<number>;
    markAsRead(req: any, senderId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
