import { Component } from '@angular/core';
import { ChatChannelMessageEvent } from '../dto/chatChannelMessageEvent';
import { Subscription } from 'rxjs';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  messages: ChatChannelMessageEvent[] = [];
  newMessage: string = '';
  private messageSubscription: Subscription | undefined;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.messageSubscription = this.chatService.onNewMessage().subscribe(
      (message: ChatChannelMessageEvent) => {
        this.messages.push(message);
      }
    );
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    this.chatService.disconnect();
  }

}
