import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatChannelMessageEvent } from '../../../../dto/chatChannelMessageEvent';
import {catchError, Observable, of} from 'rxjs';
import {PlayerInfo, PlayerInfoService} from '../../../../services/player-info.service';
import {ColorGeneratorService} from '../../../../services/color-generator.service';

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

  constructor(private playerInfoService: PlayerInfoService, private colorGenerator: ColorGeneratorService) {}

  ngOnInit() {
    this.loading = true;
    this.playerInfo$ = this.playerInfoService.getPlayerInfo(this.message.senderName).pipe(
      catchError((): Observable<null> => of(null))
    );
  }

  getRaceIcon(className: string | null): string {

    if (!className) return '/heads/unknown.png';

    const icons: { [key: string]: string } = {
      'Cra': '/heads/cra.png',
      'Ecaflip': '/heads/ecaflip.png',
      'Eliotrope': '/heads/eliotrope.png',
      'Eniripsa': '/heads/eniripsa.png',
      'Enutrof': '/heads/enutrof.png',
      'Feca': '/heads/feca.png',
      'Forgelance': '/heads/forgelance.png',
      'Huppermage': '/heads/huppermage.png',
      'Iop': '/heads/iop.png',
      'Osamodas': '/heads/osamodas.png',
      'Ouginak': '/heads/ouginak.png',
      'Pandawa': '/heads/pandawa.png',
      'Roublard': '/heads/roublard.png',
      'Sacrieur': '/heads/sacrieur.png',
      'Sadida': '/heads/sadida.png',
      'Sram': '/heads/sram.png',
      'Steamer': '/heads/steamer.png',
      'Xelor': '/heads/xelor.png',
      'Zobal': '/heads/zobal.png'
    };
    return icons[className] || '/heads/unknown.png';
  }

  getUsernameColor(username: string): string {
    return this.colorGenerator.getColorForUsername(username);
  }

}
