import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { AchievementInfoDto } from './dto/achievement-info.dto';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AchievementInfoService {
  private readonly TTL = 24 * 60 * 60 * 1000; // 24 heures en ms

  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private readonly httpService: HttpService,
  ) {}

  async getAchievementInfo(achievementId: string): Promise<AchievementInfoDto> {
    // Vérifier si les données sont en cache
    const cachedData: AchievementInfoDto =
      await this.cacheManager.get<AchievementInfoDto>(achievementId);

    if (cachedData) {
      return cachedData;
    }

    // Si pas en cache, récupérer les données
    const achievementInfoDto: AchievementInfoDto =
      await this.fetchAchievementDataFromId(achievementId);

    // Mettre en cache
    if (achievementInfoDto?.label) {
      await this.cacheManager.set(achievementId, achievementInfoDto, this.TTL);
    }

    return achievementInfoDto;
  }

  private async fetchAchievementDataFromId(
    id: string,
  ): Promise<AchievementInfoDto> {
    const url = `https://api.dofusdb.fr/achievements/${id}?$select[]=name.fr`;

    try {
      const response = await lastValueFrom(this.httpService.get(url));
      return { label: response.data?.name?.fr };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Achievement with id ${id} not found`);
      }
      // Pour toute autre erreur, on la relance
      throw error;
    }
  }
}
