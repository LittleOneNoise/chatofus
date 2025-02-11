import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';

export interface AchievementInfo {
  label: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AchievementInfoService {

  constructor(private http: HttpClient) {}

  getAchievementInfo(achievementId: string): Observable<AchievementInfo> {
    return this.http.get<AchievementInfo>(`${environment.SERVER_HOST}:${environment.SERVER_PORT}/achievement-info/${achievementId}`).pipe(
      catchError((error) => {
        console.error(`Error fetching achievement info for ${achievementId}:`, error);
        return of({ label: null } as AchievementInfo);
      })
    );
  }

}
