// player-info.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

export interface PlayerInfo {
  class: string;
  level: number;
  lastUpdate: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {
  private readonly CACHE_PREFIX = 'player_info_';
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 heures
  private readonly API_URL = '/api/dofus/fr/mmorpg/communaute/ladder/succes';

  constructor(private http: HttpClient) {}

  getPlayerInfo(playerName: string): Observable<PlayerInfo> {
    const cachedInfo = this.getFromCache(playerName);
    if (cachedInfo) {
      return of(cachedInfo);
    }

    return this.fetchPlayerInfo(playerName);
  }

  private fetchPlayerInfo(playerName: string): Observable<PlayerInfo> {
    const url = `${this.API_URL}?servers=MONO_ACCOUNT&name=${encodeURIComponent(playerName)}`;

    return this.http.get(url, {
      responseType: 'text',
      headers: {
        'Accept': 'text/html',
        'Accept-Language': 'fr-FR,fr;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }).pipe(
      tap(response => console.log('Response received:', response.slice(0, 200))), // Debug log
      map(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        console.log('Parsed document:', doc.body.innerHTML.slice(0, 200)); // Debug log

        const classElement = doc.querySelector('.ak-class');
        const levelElement = doc.querySelector('.ak-level');

        if (!classElement || !levelElement) {
          throw new Error('Player info not found in response');
        }

        const playerInfo: PlayerInfo = {
          class: classElement.textContent?.trim() || 'unknown',
          level: parseInt(levelElement.textContent?.trim() || '0', 10),
          lastUpdate: Date.now()
        };

        this.saveToCache(playerName, playerInfo);
        return playerInfo;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url
        });
        return throwError(() => error);
      })
    );
  }

  private getFromCache(playerName: string): PlayerInfo | null {
    const cached = localStorage.getItem(this.CACHE_PREFIX + playerName);
    if (!cached) return null;

    const info: PlayerInfo = JSON.parse(cached);
    if (Date.now() - info.lastUpdate > this.CACHE_DURATION) {
      localStorage.removeItem(this.CACHE_PREFIX + playerName);
      return null;
    }

    return info;
  }

  private saveToCache(playerName: string, info: PlayerInfo): void {
    localStorage.setItem(this.CACHE_PREFIX + playerName, JSON.stringify(info));
  }
}
