import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatChannelMessageEvent } from './dto/chatChannelMessageEvent';
import { jsonToDTO } from './mapper/chatChannelMessageEventMapper';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private readonly allowedChannels = [
    'SEEK',
    'SALES',
    'ADMIN',
    'INFO',
    'ADS',
    'EVENT',
  ];

  constructor(private chatGateway: ChatGateway) {}

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

  // A N'UTILISER QUE POUR ENV DEV
  @Cron('0 * * * * *') // Exécute à chaque minute quand les secondes sont à 0
  sendPeriodicChannelMessage(): void {
    const eventChatMsg: any = {
      content:
        "Du 05/02/2025 au 29/02/2025, profitez de l'évènement Galet PVM !",
      channel: 'EVENT',
      date: new Date().toISOString(),
      senderCharacterId: 666,
      senderAccountId: 666,
      senderPrefix: '',
      senderName: 'Event',
      fromAdmin: false,
      object: [],
    };
    const infoChatMsg: any = {
      content: 'Les serveurs vont être redémarrés dans 8h',
      channel: 'INFO',
      date: new Date().toISOString(),
      senderCharacterId: 666,
      senderAccountId: 666,
      senderPrefix: '',
      senderName: 'Infos',
      fromAdmin: false,
      object: [],
    };
    const adsChatMsg: any = {
      content:
        "N'hésitez pas à faire un tour dans la boutique. De nouvelles figurines sont disponibles !",
      channel: 'ADS',
      date: new Date().toISOString(),
      senderCharacterId: 666,
      senderAccountId: 666,
      senderPrefix: '',
      senderName: 'Pubs',
      fromAdmin: false,
      object: [],
    };
    const adminChatMsg: any = {
      content:
        'Nous allons procéder au ménage des bots. Merci de votre compréhension',
      channel: 'ADMIN',
      date: new Date().toISOString(),
      senderCharacterId: 666,
      senderAccountId: 666,
      senderPrefix: '',
      senderName: '[Logan]',
      fromAdmin: false,
      object: [],
    };
    this.chatGateway.sendNewMessage(eventChatMsg);
    this.chatGateway.sendNewMessage(infoChatMsg);
    this.chatGateway.sendNewMessage(adsChatMsg);
    this.chatGateway.sendNewMessage(adminChatMsg);
  }
}
