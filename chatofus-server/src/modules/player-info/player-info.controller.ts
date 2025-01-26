import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { PlayerInfoService } from './player-info.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PlayerInfoDto } from './dto/player-info.dto';
import { PlayerInfoParamDto } from './dto/player-info-param.dto';

@UseInterceptors(CacheInterceptor)
@Controller('player-info')
export class PlayerInfoController {
  private readonly logger = new Logger(PlayerInfoController.name);

  constructor(private readonly playerInfoService: PlayerInfoService) {}

  @Get(':name')
  async getPlayerInfo(
    @Param() params: PlayerInfoParamDto,
  ): Promise<PlayerInfoDto> {
    const playerInfo = await this.playerInfoService.getPlayerInfo(params.name);

    if (!playerInfo.class && !playerInfo.level) {
      this.logger.error(`Player '${params.name}' not found`);
      throw new NotFoundException(`Player '${params.name}' not found`);
    }

    return playerInfo;
  }
}
