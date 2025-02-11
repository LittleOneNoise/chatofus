import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { SubareaInfoDto } from './dto/subarea-info.dto';

@Injectable()
export class SubareaInfoService {
  private readonly TTL = 24 * 60 * 60 * 1000; // 24 heures en ms

  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private readonly httpService: HttpService,
  ) {}

  async getSubareaInfo(subareaId: string): Promise<SubareaInfoDto> {
    // Vérifier si les données sont en cache
    const cachedData: SubareaInfoDto =
      await this.cacheManager.get<SubareaInfoDto>(subareaId);

    if (cachedData) {
      return cachedData;
    }

    // Si pas en cache, récupérer les données
    const subareaInfoDto: SubareaInfoDto =
      await this.fetchSubareaDataFromId(subareaId);

    // Mettre en cache
    if (subareaInfoDto?.label) {
      await this.cacheManager.set(subareaId, subareaInfoDto, this.TTL);
    }

    return subareaInfoDto;
  }

  private async fetchSubareaDataFromId(id: string): Promise<SubareaInfoDto> {
    const url = `https://api.dofusdb.fr/subareas/${id}?$select[]=name.fr`;

    try {
      const response = await lastValueFrom(this.httpService.get(url));
      return { label: response.data?.name?.fr };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Subarea with id ${id} not found`);
      }
      // Pour toute autre erreur, on la relance
      throw error;
    }
  }
}
