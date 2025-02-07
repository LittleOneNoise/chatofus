import { Inject, Injectable } from '@nestjs/common';
import { PlayerInfoDto } from './dto/player-info.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import puppeteer, { Page } from 'puppeteer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlayerInfoService {
  private readonly TTL = 24 * 60 * 60 * 1000; // 24 heures en ms
  private cacheEnabled =
    this.configService.get<string>('PLAYER_INFO_CACHE_ENABLED') === 'true';

  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private configService: ConfigService,
  ) {}

  async getPlayerInfo(playerName: string): Promise<PlayerInfoDto> {
    if (this.cacheEnabled) {
      // Vérifier si les données sont en cache
      const cachedData: PlayerInfoDto =
        await this.cacheManager.get<PlayerInfoDto>(playerName);

      if (cachedData) {
        return cachedData;
      }
    }

    // Si pas en cache, récupérer les données
    const playerInfoDto: PlayerInfoDto =
      await this.scrapePlayerInfo(playerName);

    if (this.cacheEnabled) {
      // Mettre en cache
      if (playerInfoDto.class && playerInfoDto.level) {
        await this.cacheManager.set(playerName, playerInfoDto, this.TTL);
      }
    }

    return playerInfoDto;
  }

  private async scrapePlayerInfo(playerName: string): Promise<PlayerInfoDto> {
    const browser = await puppeteer.launch({
      headless: true,
    });

    const urls = [
      `https://www.dofus.com/fr/mmorpg/communaute/ladder/succes?servers=MONO_ACCOUNT&name=${encodeURIComponent(playerName)}`,
      `https://www.dofus.com/fr/mmorpg/communaute/ladder/general?servers=MONO_ACCOUNT&name=${encodeURIComponent(playerName)}`,
    ];

    try {
      const page: Page = await browser.newPage();

      // Permet de ne pas se faire rejeter par le site Dofus
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      );
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      });

      // Lancer les deux appels en parallèle
      const scrapePromises = urls.map(async (url) => {
        try {
          await page.goto(url, { waitUntil: 'networkidle0' });

          return await page.evaluate((): PlayerInfoDto => {
            const classElement = document.querySelector('.ak-class');
            const levelElement = document.querySelector('.ak-level');
            const levelOmegaElement = document.querySelector('.ak-omega-level');

            // Prends en charge le cas des niveaux omegas
            if (levelOmegaElement) {
              levelElement.textContent = '200';
            }

            return {
              class: classElement?.textContent?.trim() || null,
              level: Number(levelElement?.textContent?.trim()) || null,
            };
          });
        } catch (error) {
          // Retourne null si l'appel échoue pour permettre une gestion après
          return null;
        }
      });

      // Attendre que le premier appel retourne une réponse non nulle
      const result = await Promise.race(
        scrapePromises.map((p) => p.then((res) => res || null)),
      );

      if (result) {
        return result;
      }

      // Si aucun appel ne retourne de résultat, lever une exception
      const allResults = await Promise.all(scrapePromises);
      if (allResults.every((res) => !res)) {
        throw new Error(
          'Aucune information trouvée pour le joueur sur les deux URLs.',
        );
      }

      return allResults.find((res) => res) || null; // Par sécurité, retourne le premier résultat valide
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération des informations: ${error.message}`,
      );
    } finally {
      await browser.close();
    }
  }
}
