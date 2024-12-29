import {
  ConnectedSocket, MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatChannelMessageEvent } from '../dto/chatChannelMessageEvent';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*', // En production, spécifier l'origine exacte
  },
})
export class ChatGateway {
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket): void {
    const token = client.handshake?.query?.token;
    this.logger.log(`Socket client connectée : ${token}`);
  }

  handleDisconnect(client: Socket): void {
    const token = client.handshake?.query?.token;
    this.logger.log(`Socket client déconnectée : ${token}`);
  }

  sendNewMessage(message: ChatChannelMessageEvent): void {
    this.server.emit('newMessage', message);
  }

}
