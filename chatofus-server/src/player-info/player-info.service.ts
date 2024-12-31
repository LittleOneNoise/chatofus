import {Inject, Injectable} from '@nestjs/common';
import {PlayerInfoDto} from "./dtos/player-info.dto";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import type {Cache} from 'cache-manager';
import puppeteer from 'puppeteer';

@Injectable()
export class PlayerInfoService {

    private readonly TTL = 24 * 60 * 60 * 1000; // 24 heures en ms

    constructor(
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache
    ) {}

    async getPlayerInfo(playerName: string): Promise<PlayerInfoDto> {

        // Vérifier si les données sont en cache
        const cachedData: PlayerInfoDto = await this.cacheManager.get<PlayerInfoDto>(playerName);

        if (cachedData) {
            return cachedData;
        }

        // Si pas en cache, récupérer les données
        const playerInfoDto: PlayerInfoDto = await this.scrapePlayerInfo(playerName);

        // Mettre en cache
        if (playerInfoDto.class && playerInfoDto.level) {
            await this.cacheManager.set(
                playerName,
                playerInfoDto,
                this.TTL
            );
        }

        return playerInfoDto;
    }


    private async scrapePlayerInfo(playerName: string): Promise<PlayerInfoDto> {
        const browser = await puppeteer.launch({
            headless: true
        });

        try {
            const page = await browser.newPage();

            // Permet de ne pas se faire rejeter par le site Dofus
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
            await page.setExtraHTTPHeaders({
                'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            });

            const url = `https://www.dofus.com/fr/mmorpg/communaute/ladder/succes?servers=MONO_ACCOUNT&name=${encodeURIComponent(playerName)}`;
            await page.goto(url, { waitUntil: 'networkidle0' });

            return await page.evaluate((): PlayerInfoDto => {
                const classElement = document.querySelector('.ak-class');
                const levelElement = document.querySelector('.ak-level');
                const levelOmegaElement = document.querySelector('.ak-omega-level');

                // Prends en charge le cas des niveaux omegas
                if (levelOmegaElement) {
                    levelElement.textContent = "200";
                }

                return {
                    class: classElement?.textContent?.trim() || null,
                    level: Number(levelElement?.textContent?.trim()) || null
                };
            });

        } catch (error) {
            throw new Error(`Erreur lors de la récupération des informations: ${error.message}`);
        } finally {
            await browser.close();
        }
    }

}
