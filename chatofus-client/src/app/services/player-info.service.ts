import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PlayerInfo {
  class: string;
  level: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {

  constructor(private http: HttpClient) {}

  getPlayerInfo(playerName: string): Observable<PlayerInfo> {
    return this.http.get<PlayerInfo>(`${environment.SERVER_HOST}:${environment.SERVER_PORT}/player-info/${playerName}`);
  }

}
