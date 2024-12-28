import { Injectable } from '@nestjs/common';
import { ChatChannelMessageEvent } from '../dto/chatChannelMessageEvent';
import { jsonToDTO } from '../mapper/chatChannelMessageEventMapper';

@Injectable()
export class ChatService {
  handleChatData(jsonInput: string) {
    const chatChannelMessageEvent: ChatChannelMessageEvent =
      jsonToDTO(jsonInput);

    console.log('JSONIZED :');
    console.log(JSON.stringify(chatChannelMessageEvent, null, 2));
  }
}
