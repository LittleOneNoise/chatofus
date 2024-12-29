import { Component } from '@angular/core';
import { ChatChannelMessageEvent } from '../dto/chatChannelMessageEvent';
import {SocketService} from '../services/socket.service';
import {Socket} from 'socket.io-client';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  messages: ChatChannelMessageEvent[] = [];
  private socket: Socket | null = null;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socket = this.socketService.connect();

    if (this.socket) {
      this.socket.on('newMessage', (message: ChatChannelMessageEvent) => {
        this.messages = [...this.messages, message];
      });

    }
  }

  ngOnDestroy(): void {}

  protected readonly Date = Date;
}
