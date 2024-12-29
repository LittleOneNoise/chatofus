import { Injectable } from '@nestjs/common';
import { ChatChannelMessageEvent } from '../dto/chatChannelMessageEvent';
import { jsonToDTO } from '../mapper/chatChannelMessageEventMapper';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatService {
  constructor(private chatGateway: ChatGateway) {}

  handleChatData(jsonInput: string) {
    const chatChannelMessageEvent: ChatChannelMessageEvent =
      jsonToDTO(jsonInput);

    console.log('JSONIZED :');
    console.log(JSON.stringify(chatChannelMessageEvent, null, 2));

    this.chatGateway.sendNewMessage(chatChannelMessageEvent);
  }
}
