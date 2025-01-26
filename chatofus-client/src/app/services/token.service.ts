import {Injectable} from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import {UserToken} from './userToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY: string = 'userToken';
  private readonly EXPIRATION_SECONDS: number = 15; // *60 pour min, *60*60 pour h, *24*60*60 pour jour

  constructor() { }

  getUserToken(): string {
    const storedToken: UserToken | null = this.getStoredToken();

    console.log(`Récupération de token`)

    if (storedToken && !this.isTokenExpired(storedToken)) {
      console.log(storedToken.value);
      return storedToken.value;
    }

    // Si pas de token ou token expiré, en créer un nouveau
    return this.createNewToken();
  }

  private getStoredToken(): UserToken | null {
    const tokenJson: string | null = localStorage.getItem(this.TOKEN_KEY);
    if (!tokenJson) return null;

    try {
      return JSON.parse(tokenJson);
    } catch {
      return null;
    }
  }

  private isTokenExpired(token: UserToken): boolean {
    return Date.now() > token.expiresAt;
  }

  private createNewToken(): string {
    const token: UserToken = {
      value: uuidv4(),
      expiresAt: Date.now() + (this.EXPIRATION_SECONDS * 1000)
    };

    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
    console.log(token.value);
    return token.value;
  }

}
