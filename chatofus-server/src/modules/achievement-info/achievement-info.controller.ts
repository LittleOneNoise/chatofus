import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { AchievementInfoService } from './achievement-info.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AchievementInfoParamDto } from './dto/achievement-info-param.dto';
import { AchievementInfoDto } from './dto/achievement-info.dto';

@UseInterceptors(CacheInterceptor)
@Controller('achievement-info')
export class AchievementInfoController {
  private readonly logger = new Logger(AchievementInfoController.name);

  constructor(
    private readonly achievementInfoService: AchievementInfoService,
  ) {}

  @Get(':id')
  async getAchievementInfo(
    @Param() params: AchievementInfoParamDto,
  ): Promise<AchievementInfoDto> {
    const achievementInfo =
      await this.achievementInfoService.getAchievementInfo(params.id);

    if (!achievementInfo?.label) {
      this.logger.error(`Achievement '${params.id}' not found`);
      throw new NotFoundException(`Achievement '${params.id}' not found`);
    }

    return achievementInfo;
  }
}
