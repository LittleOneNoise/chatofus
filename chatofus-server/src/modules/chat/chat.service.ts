import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatChannelMessageEvent } from './dto/chatChannelMessageEvent';
import { jsonToDTO } from './mapper/chatChannelMessageEventMapper';
import { PortalsService } from '../portals/portals.service';
import { WantedService } from '../wanted/wanted.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private readonly allowedChannels = ['SEEK', 'SALES', 'INFO'];

  constructor(
    private chatGateway: ChatGateway,
    private portalsService: PortalsService,
    private wantedService: WantedService,
  ) {}

  addChatMessage(jsonInput: string): boolean {
    try {
      const chatChannelMessageEvent: ChatChannelMessageEvent =
        jsonToDTO(jsonInput);

      this.logger.log('Incoming message :');
      this.logger.log(JSON.stringify(chatChannelMessageEvent, null, 2));
      if (
        this.allowedChannels.includes(String(chatChannelMessageEvent.channel))
      ) {
        this.chatGateway.sendNewMessage(chatChannelMessageEvent);
        this.portalsService.analyzeMessage(chatChannelMessageEvent);
        this.wantedService.analyzeMessage(chatChannelMessageEvent);
      } else {
        this.logger.warn(
          `Message de type [${chatChannelMessageEvent.channel}] non autorisé et ignoré`,
        );
      }

      return true;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
