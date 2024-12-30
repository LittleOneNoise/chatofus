import {Inject, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {PlayerInfoDto} from "./dtos/player-info.dto";
import {firstValueFrom} from "rxjs";
import {load} from "cheerio";
import {HttpService} from "@nestjs/axios";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import type { Cache } from 'cache-manager';

@Injectable()
export class PlayerInfoService {

    private readonly logger = new Logger(PlayerInfoService.name);
    private readonly CACHE_TTL = 24 * 60 * 60 * 1000; // 24 heures en ms

    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async getPlayerInfo(name: string): Promise<PlayerInfoDto> {
        // Vérifier le cache d'abord
        const cachedData = await this.cacheManager.get<PlayerInfoDto>(`player-${name}`);
        if (cachedData) {
            return cachedData;
        }

        try {
            const url = 'https://www.dofus.com/fr/mmorpg/communaute/ladder/succes';
            const response = await firstValueFrom(
                this.httpService.get(url, {
                    params: {
                        servers: 'MONO_ACCOUNT',
                        name
                    },
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                        'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7'
                    }
                })
            );

            const $ = load(response.data);
            const classElement = $('.ak-class');
            const levelElement = $('.ak-level');

            if (!classElement.length || !levelElement.length) {
                throw new NotFoundException('Player not found');
            }

            const playerInfo: PlayerInfoDto = {
                class: classElement.text().trim(),
                level: parseInt(levelElement.text().trim(), 10)
            };

            // Mettre en cache pour les futures requêtes
            await this.cacheManager.set(`player-${name}`, playerInfo, this.CACHE_TTL);

            return playerInfo;
        } catch (error) {
            this.logger.error(`Error fetching player info for ${name}:`, error);
            throw error;
        }
    }

}
