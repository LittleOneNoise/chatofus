import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatChannelMessageEvent } from '../../../../dto/chatChannelMessageEvent';
import {catchError, Observable, of} from 'rxjs';
import {PlayerInfo, PlayerInfoService} from '../../../../services/player-info.service';

@Component({
  selector: 'app-chat-message',
  imports: [CommonModule],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css'
})
export class ChatMessageComponent {

  @Input({ required: true }) message!: ChatChannelMessageEvent;
  playerInfo$: Observable<PlayerInfo | null> = of(null);
  loading = false;

  constructor(private playerInfoService: PlayerInfoService) {}

  ngOnInit() {
    this.loading = true;
    this.playerInfo$ = this.playerInfoService.getPlayerInfo(this.message.senderName).pipe(
      catchError(() => of(null))
    );
  }

  getRaceIcon(className: string | null): string {
    if (!className) return '/assets/loading-spinner.gif';

    const icons: { [key: string]: string } = {
      'Feca': '/heads/feca.png',
      'Iop': '/heads/iop.png',
      // Ajoutez les autres classes ici
    };
    return icons[className] || '/heads/unknown.png';
  }

}
