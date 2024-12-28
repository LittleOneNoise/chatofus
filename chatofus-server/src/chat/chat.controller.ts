import {Body, Controller, Post, Headers, Req, RawBodyRequest} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(private readonly chatService : ChatService) {};

    // @Post()
    // addChatMessage(@Headers('Content-Type') contentType: string, @Headers('Key') key: string, @Headers('ProtoMessageName') protoMessageName: string, @Body() body: any) {
    //     console.log('Le type : ', contentType);
    //     console.log('La clé : ', key);
    //     console.log('Le type Message : ', protoMessageName);
    //     console.log('Le body : ', body);
    //
    //     // this.chatService.addChatMessage();
    // }

    @Post()
    addChatMessage(@Req() request: any) {
        console.log('Le type : ', request.headers['content-type']);
        console.log('La clé : ', request.headers['key']);
        console.log('Le type Message : ', request.headers['protomessagename']);
        console.log('Le raw body : ', request.rawBody);
        console.log('Le body : ', request.body);
        // console.log('REQUEST : ', request)

        // this.chatService.addChatMessage();
    }


}
