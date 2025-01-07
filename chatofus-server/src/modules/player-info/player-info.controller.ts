import {
  Controller,
  Get,
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
  constructor(private readonly playerInfoService: PlayerInfoService) {}

  @Get(':name')
  async getPlayerInfo(
    @Param() params: PlayerInfoParamDto,
  ): Promise<PlayerInfoDto> {
    const playerInfo = await this.playerInfoService.getPlayerInfo(params.name);

    if (!playerInfo.class && !playerInfo.level) {
      throw new NotFoundException(`Player '${params.name}' not found`);
    }

    return playerInfo;
  }
}
