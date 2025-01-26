import {Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ChatChannelMessageEvent} from '../../../../dto/chatChannelMessageEvent';
import {finalize, Observable, of} from 'rxjs';
import {PlayerInfo, PlayerInfoService} from '../../../../services/player-info.service';

@Component({
  selector: 'app-chat-message',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css'
})
export class ChatMessageComponent {
  @Input() message!: ChatChannelMessageEvent;
  playerInfo$: Observable<PlayerInfo | null> = of(null);
  loading = false;

  constructor(private playerInfoService: PlayerInfoService) {}

  ngOnInit() {
    this.loading = true;
    this.playerInfo$ = this.playerInfoService.getPlayerInfo(this.message.senderName).pipe(
      finalize(() => {
        this.loading = false;
      })
    );
  }

}
