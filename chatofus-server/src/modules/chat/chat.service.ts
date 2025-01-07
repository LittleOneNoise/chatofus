import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatChannelMessageEvent } from './dto/chatChannelMessageEvent';
import { jsonToDTO } from './mapper/chatChannelMessageEventMapper';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(private chatGateway: ChatGateway) {}

  addChatMessage(jsonInput: string): boolean {
    try {
      const chatChannelMessageEvent: ChatChannelMessageEvent =
        jsonToDTO(jsonInput);

      this.logger.log('JSONIZED :');
      this.logger.log(JSON.stringify(chatChannelMessageEvent, null, 2));

      this.chatGateway.sendNewMessage(chatChannelMessageEvent);
      return true;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
