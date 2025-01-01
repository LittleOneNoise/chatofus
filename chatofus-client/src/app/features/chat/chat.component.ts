import {Component} from '@angular/core';
import {Channel, ChatChannelMessageEvent} from '../../dto/chatChannelMessageEvent';
import {SocketService} from '../../services/socket.service';
import {Socket} from 'socket.io-client';
import {CommonModule} from '@angular/common';
import {ChatMessageComponent} from './components/chat-message/chat-message.component';
import {chatAnimations} from './chat.animations';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, ChatMessageComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  animations: chatAnimations
})
export class ChatComponent {

  messages: ChatChannelMessageEvent[] = [];
  activeChannels: Set<Channel> = new Set([Channel.SEEK, Channel.SALES, Channel.GUILD, Channel.PRIVATE]); // tous activés par défaut
  highlightWords: string[] = [];
  private socket: Socket | null = null;
  private isScrolledToBottom = true;
  private chatContainer: HTMLElement | null = null;
  hasUnreadMessages = false;
  protected unreadMessagesCount = 0;
  readonly Channel = Channel;

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

  get filteredMessages(): ChatChannelMessageEvent[] {
    return this.messages.filter(msg => this.activeChannels.has(msg.channel));
  }

  getChannelName(channel: Channel): string {
    const channelNames: Record<Channel, string> = {
      [Channel.GLOBAL]: 'Global',
      [Channel.TEAM]: 'Team',
      [Channel.GUILD]: 'Guilde',
      [Channel.ALLIANCE]: 'Alliance',
      [Channel.PARTY]: 'Groupe',
      [Channel.SALES]: 'Ventes',
      [Channel.SEEK]: 'Recherche',
      [Channel.NOOB]: 'Débutant',
      [Channel.ADMIN]: 'Admin',
      [Channel.ARENA]: 'Arène',
      [Channel.PRIVATE]: 'Privé',
      [Channel.INFO]: 'Info',
      [Channel.FIGHT_LOG]: 'Combat',
      [Channel.ADS]: 'Annonces',
      [Channel.EVENT]: 'Événement',
      [Channel.EXCHANGE]: 'Échange'
    };

    return channelNames[channel];
  }

  get channelDisplay(): string {
    return Array.from(this.activeChannels)
      .map(channel => this.getChannelName(channel))
      .join(', ') || 'Aucun canal';
  }

  toggleChannel(channel: Channel): void {
    if (this.activeChannels.has(channel)) {
      this.activeChannels.delete(channel);
    } else {
      this.activeChannels.add(channel);
    }
  }

  updateHighlightWords(event: Event): void {
    const input = event.target as HTMLInputElement;
    const words = input.value;
    this.highlightWords = words
      .toLowerCase()
      .split(',')
      .map(word => word.trim())
      .filter(word => word.length > 0);
  }

  ngOnDestroy(): void {
    if (this.chatContainer) {
      this.chatContainer.removeEventListener('scroll', () => {});
    }
    this.socket?.disconnect();
  }

  protected readonly Object = Object;
}
