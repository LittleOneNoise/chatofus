import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { PortalsService } from '../portals/portals.service';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  providers: [ChatGateway, ChatService, PortalsService, PrismaService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
