import { Component } from '@angular/core';
import { ChatChannelMessageEvent } from '../../dto/chatChannelMessageEvent';
import { SocketService } from '../../services/socket.service';
import { Socket } from 'socket.io-client';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { chatAnimations } from './chat.animations';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, ChatMessageComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  animations: chatAnimations
})
export class ChatComponent {

  messages: ChatChannelMessageEvent[] = [];
  private socket: Socket | null = null;
  private isScrolledToBottom = true;
  private chatContainer: HTMLElement | null = null;
  hasUnreadMessages = false;
  protected unreadMessagesCount = 0;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socket = this.socketService.connect();

    setTimeout(() => {
      this.chatContainer = document.querySelector('.overflow-y-auto');
      this.setupScrollListener();
    }, 0);

    if (this.socket) {
      this.socket.on('newMessage', (message: ChatChannelMessageEvent) => {
        this.messages = [...this.messages, message];

        if (this.isScrolledToBottom) {
          this.scrollToBottom();
        } else {
          this.hasUnreadMessages = true;
          this.unreadMessagesCount++;
        }
      });
    }
  }

  private setupScrollListener(): void {
    if (!this.chatContainer) return;

    this.chatContainer.addEventListener('scroll', () => {
      if (!this.chatContainer) return;

      const isNearBottom = this.chatContainer.scrollHeight - this.chatContainer.scrollTop - this.chatContainer.clientHeight < 50;

      if (this.isScrolledToBottom !== isNearBottom) {
        this.isScrolledToBottom = isNearBottom;
        if (isNearBottom) {
          this.hasUnreadMessages = false;
          this.unreadMessagesCount = 0;
        }
      }
    });
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
        this.hasUnreadMessages = false;
        this.unreadMessagesCount = 0;
      }
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.chatContainer) {
      this.chatContainer.removeEventListener('scroll', () => {});
    }
    this.socket?.disconnect();
  }

}
