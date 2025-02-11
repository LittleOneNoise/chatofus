import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { SubareaInfoService } from './subarea-info.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { SubareaInfoParamDto } from './dto/subarea-info-param.dto';
import { SubareaInfoDto } from './dto/subarea-info.dto';

@UseInterceptors(CacheInterceptor)
@Controller('subarea-info')
export class SubareaInfoController {
  private readonly logger = new Logger(SubareaInfoController.name);

  constructor(private readonly subareaInfoService: SubareaInfoService) {}

  @Get(':id')
  async getSubareaInfo(
    @Param() params: SubareaInfoParamDto,
  ): Promise<SubareaInfoDto> {
    const subareaInfo = await this.subareaInfoService.getSubareaInfo(params.id);

    if (!subareaInfo?.label) {
      this.logger.error(`Subarea '${params.id}' not found`);
      throw new NotFoundException(`Subarea '${params.id}' not found`);
    }

    return subareaInfo;
  }
}
