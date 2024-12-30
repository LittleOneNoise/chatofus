import {Controller, Get, Param, UseInterceptors} from '@nestjs/common';
import {PlayerInfoService} from "./player-info.service";
import {CacheInterceptor} from "@nestjs/cache-manager";
import {PlayerInfoDto} from "./dtos/player-info.dto";

@UseInterceptors(CacheInterceptor)
@Controller('player-info')
export class PlayerInfoController {

    constructor(private readonly playerInfoService: PlayerInfoService,) {}

    @Get(':name')
    async getPlayerInfo(@Param('name') name: string): Promise<PlayerInfoDto> {
        return this.playerInfoService.getPlayerInfo(name);
    }

}
