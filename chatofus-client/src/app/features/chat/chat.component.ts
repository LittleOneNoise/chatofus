import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {Channel, ChatChannelMessageEvent} from '../../dto/chatChannelMessageEvent';
import {SocketService} from '../../services/socket.service';
import {Socket} from 'socket.io-client';
import {CommonModule} from '@angular/common';
import {ChatMessageComponent} from './components/chat-message/chat-message.component';
import {ChannelFilterComponent} from './components/channel-filter/channel-filter.component';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, ChatMessageComponent, ChannelFilterComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {

  messages: ChatChannelMessageEvent[] = [];
  filteredMessages: ChatChannelMessageEvent[] = [];
  unreadMessages = 0;
  autoScrollEnabled = true;
  activeChannels: Channel[] = [Channel.SEEK, Channel.SALES, Channel.INFO];
  private socket: Socket | null = null;
  private readonly MAX_MESSAGES = 200;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socket = this.socketService.connect();

    if (this.socket) {
      this.socket.on('newMessage', (message: ChatChannelMessageEvent) => {
        this.messages.push(message);

        if (this.messages.length > this.MAX_MESSAGES) {
          this.messages.shift();
        }

        this.filterMessages();

        if (this.autoScrollEnabled) {
          this.scrollToBottom();
        } else {
          this.unreadMessages++;
        }
      });
    }
  }

  filterMessages(): void {
    this.filteredMessages = this.messages.filter(message => {
      const channelEnum = this.mapStringToChannel(message.channel); // Conversion de string à enum
      return channelEnum !== undefined && this.activeChannels.includes(channelEnum);
    });
  }

  mapStringToChannel(channelString: string): Channel | undefined {
    // Vérifie si la chaîne correspond à une clé dans l'énumération Channel
    const key = channelString.toUpperCase() as keyof typeof Channel;
    return Channel[key];
  }

  toggleChannel(channel: Channel): void {
    if (this.activeChannels.includes(channel)) {
      this.activeChannels = this.activeChannels.filter(c => c !== channel);
    } else {
      this.activeChannels.push(channel);
    }
    this.filterMessages();
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 5; // Marge de 5px

    this.autoScrollEnabled = isAtBottom;
    if (isAtBottom) {
      this.unreadMessages = 0;
    }
  }

  scrollToBottom(): void {
    const container = document.querySelector('.messages-container');
    container?.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }

  ngAfterViewChecked(): void {
    if (this.autoScrollEnabled) {
      this.scrollToBottom();
    }
  }

  ngOnDestroy(): void {
    this.socket?.disconnect();
  }
}
