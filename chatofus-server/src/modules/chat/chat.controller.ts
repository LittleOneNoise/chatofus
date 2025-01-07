import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async addChatMessage(@Body() body: string): Promise<boolean> {
    return this.chatService.addChatMessage(body);
  }
}