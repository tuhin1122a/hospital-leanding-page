import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private prisma: PrismaService) {}

  private userSockets = new Map<string, string>(); // userId -> socketId

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.userSockets.set(userId, client.id);
      console.log(`User connected: ${userId} with socket: ${client.id}`);
      this.broadcast('userStatus', { userId, status: 'online' });
    }
  }

  async handleDisconnect(client: Socket) {
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

        // Update database so that a refresh or first load shows the correct time
        await this.prisma.user
          .update({
            where: { id: userId },
            data: { lastActive },
          })
          .catch(() => {});

        break;
      }
    }
  }

  sendToUser(userId: string, event: string, data: any) {
    const socketId = this.userSockets.get(userId);
    if (socketId) {
      this.server.to(socketId).emit(event, data);
    }
  }

  broadcast(event: string, data: any) {
    this.server.emit(event, data);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { to: string; message: string; from: string; senderName: string },
  ) {
    console.log(`Message from ${data.from} to ${data.to}: ${data.message}`);
    // Emit to receiver
    this.sendToUser(data.to, 'newMessage', {
      from: data.from,
      senderName: data.senderName,
      message: data.message,
      createdAt: new Date(),
    });
  }

  isUserOnline(userId: string): boolean {
    return this.userSockets.has(userId);
  }
}
