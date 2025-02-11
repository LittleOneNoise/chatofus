import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

export interface AchievementInfo {
  label: string | null;
}

export interface SubareaInfo {
  label: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class DofusdbService {

  constructor(private http: HttpClient) { }

  getAchievementInfo(achievementId: string): Observable<AchievementInfo> {
    return this.http.get<AchievementInfo>(`${environment.SERVER_HOST}:${environment.SERVER_PORT}/achievement-info/${achievementId}`).pipe(
      catchError((error) => {
        console.error(`Error fetching achievement info for ${achievementId}:`, error);
        return of({ label: null } as AchievementInfo);
      })
    );
  }

  getSubareaInfo(subareaId: string): Observable<SubareaInfo> {
    return this.http.get<SubareaInfo>(`${environment.SERVER_HOST}:${environment.SERVER_PORT}/subarea-info/${subareaId}`).pipe(
      catchError((error) => {
        console.error(`Error fetching subarea info for ${subareaId}:`, error);
        return of({ label: null } as SubareaInfo);
      })
    );
  }
}
