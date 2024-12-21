import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(private readonly chatService : ChatService) {};

    // @Post()
    // addChatMessage(@Body() chatMessage): void {
    //     console.log('addChatMessage()');
    //     console.log('Body :', chatMessage);
    //     this.chatService.addChatMessage(chatMessage);
    // }

    @Post()
    addChatMessage(): void {
        this.chatService.addChatMessage();
    }


}
