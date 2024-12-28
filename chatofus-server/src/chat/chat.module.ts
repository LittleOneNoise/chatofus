import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';


@Module({
  providers: [ChatGateway, ChatService],
  controllers: [ChatController], // Si vous avez un controller
  exports: [ChatService], // Si vous avez besoin d'utiliser ChatService dans d'autres modules
})
export class ChatModule {}
