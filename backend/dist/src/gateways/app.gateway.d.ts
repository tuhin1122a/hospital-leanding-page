import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../prisma.service';
export declare class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private prisma;
    server: Server;
    constructor(prisma: PrismaService);
    private userSockets;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): Promise<void>;
    sendToUser(userId: string, event: string, data: any): void;
    broadcast(event: string, data: any): void;
    handleMessage(client: Socket, data: {
        to: string;
        message: string;
        from: string;
        senderName: string;
    }): void;
    isUserOnline(userId: string): boolean;
}
