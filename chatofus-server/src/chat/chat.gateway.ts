import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatChannelMessageEvent } from '../dto/chatChannelMessageEvent';

@WebSocketGateway({
  cors: {
    origin: '*', // En production, spécifiez l'origine exacte
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() message: ChatChannelMessageEvent): void {
    this.server.emit('newMessage', message);
  }

  handleConnection(client: Socket) {
    console.log(`Client connecté: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client déconnecté: ${client.id}`);
  }
}
