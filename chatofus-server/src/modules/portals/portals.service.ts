import { Injectable, Logger } from '@nestjs/common';
import { PortalType } from '@prisma/client';
import { ChatChannelMessageEvent } from '../chat/dto/chatChannelMessageEvent';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class PortalsService {
  private readonly logger = new Logger(PortalsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  analyzeMessage(chatChannelMessageEvent: ChatChannelMessageEvent): void {
    const portalRegex = new RegExp(
      /^(?=.*\{map)(?=.*\b(X[ée]lorium|Ecaflipus|Sram(?:bad|vil)|Enu(?:trosor|rado)|Zurcalia|Anutrop[ií]a)\b).+$/i,
    );
    const match = portalRegex.exec(chatChannelMessageEvent?.content);
    if (match) {
      const dimension = match[1];
      this.logger.log(`Dimension trouvée : ${dimension}`);
      this.addPortalPositionToDataset(
        dimension,
        chatChannelMessageEvent?.content,
      ).then();
    } else {
      this.logger.warn(
        `Pas de match de portail pour le message : ${chatChannelMessageEvent?.content}`,
      );
    }
  }

  async addPortalPositionToDataset(
    dimension: string,
    message: string,
  ): Promise<void> {
    this.logger.log(
      `dimension.normalize('NFD') ==> ${dimension.normalize('NFD').toLowerCase()}`,
    );
    let typePortal: PortalType = null;
    switch (dimension.normalize('NFD').toLowerCase()) {
      case 'xelorium':
        typePortal = PortalType.XELORIUM;
        break;
      case 'enutrosor':
        typePortal = PortalType.ENUTROSOR;
        break;
      case 'srambad':
        typePortal = PortalType.SRAMBAD;
        break;
      case 'ecaflipus':
        typePortal = PortalType.ECAFLIPUS;
        break;
      default:
        break;
    }
    this.logger.log(`typePortal: ${typePortal}`);
    try {
      await this.prismaService.devPortalPositionDataset.create({
        data: {
          type: typePortal,
          messageChat: message,
        },
      });
    } catch (e) {
      this.logger.error(e);
    }
  }
}
