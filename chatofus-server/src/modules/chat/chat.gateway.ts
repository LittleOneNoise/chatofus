import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChatChannelMessageEvent } from './dto/chatChannelMessageEvent';

@WebSocketGateway({
  cors: {
    origin: '*', // En production, spécifier l'origine exacte
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  private readonly logger = new Logger(ChatGateway.name);

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
