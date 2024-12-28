import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { ChatChannelMessageEvent } from '../dto/chatChannelMessageEvent';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly socket: Socket;

  constructor() {
    this.socket = io('http://localhost:6666'); // L'URL de votre serveur NestJS
  }

  onNewMessage(): Observable<ChatChannelMessageEvent> {
    return new Observable(observer => {
      this.socket.on('newMessage', (message: ChatChannelMessageEvent) => {
        observer.next(message);
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
