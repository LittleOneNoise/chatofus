import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';

export interface PlayerInfo {
  class: string;
  level: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {

  constructor(private http: HttpClient) {}

  getPlayerInfo(playerName: string): Observable<PlayerInfo> {
    return this.http.get<PlayerInfo>(`${environment.SERVER_HOST}:${environment.SERVER_PORT}/player-info/${playerName}`).pipe(
      catchError((error) => {
        console.error(`Error fetching player info for ${playerName}:`, error);
        return of({ class: 'unknown', level: null } as PlayerInfo); // Retourne des valeurs par défaut
      })
    );
  }

}
