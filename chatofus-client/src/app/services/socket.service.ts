import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';
import { environment } from '../../../environments/environment';
import {TokenService} from './token.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket | null = null;
  private connectionStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public connectionStatus$: Observable<boolean> = this.connectionStatus.asObservable();

  constructor(private tokenService: TokenService) { }

  public connect(): Socket {
    if (!this.socket) {
      this.socket = io(environment.SOCKET_ENDPOINT, {
        query: {
          token: this.tokenService.getUserToken()
        }, timeout: 1000
      });
      this.setupConnectionListeners();
    }
    return this.socket;
  }

  private setupConnectionListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      this.connectionStatus.next(true);
      console.log('Connecté au serveur WebSocket');
    });

    this.socket.on('disconnect', () => {
      this.connectionStatus.next(false);
      console.log('Déconnecté du serveur WebSocket');
    });

    this.socket.on('connect_error', (error) => {
      this.connectionStatus.next(false);
      console.error('Erreur de connexion:', error);
    });
  }

  isConnected(): boolean {
    return this.connectionStatus.value;
  }

}
