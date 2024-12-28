import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  addChatMessage(@Body() body: string): void {
    this.chatService.handleChatData(body);
  }
}
