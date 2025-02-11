import {Component, Input, OnChanges, SimpleChanges, Type} from '@angular/core';
import {CommonModule, NgComponentOutlet, NgOptimizedImage} from '@angular/common';
import {ChatChannelMessageEvent} from '../../../../dto/chatChannelMessageEvent';
import {finalize, Observable, of} from 'rxjs';
import {PlayerInfo, PlayerInfoService} from '../../../../services/player-info.service';
import {ChatTokenizerService, Segment} from '../../../../services/chat-tokenizer.service';
import {ChatModuleMonsterGroupComponent} from '../chat-module-monster-group/chat-module-monster-group.component';
import {
  ChatModuleChatAchievementComponent
} from '../chat-module-chat-achievement/chat-module-chat-achievement.component';
import {ChatModuleSubAreaComponent} from '../chat-module-sub-area/chat-module-sub-area.component';
import {ChatModuleMapComponent} from '../chat-module-map/chat-module-map.component';
import {ChatModuleGuildComponent} from '../chat-module-guild/chat-module-guild.component';
import {ChatModuleChatItemComponent} from '../chat-module-chat-item/chat-module-chat-item.component';

@Component({
  selector: 'app-chat-message',
  imports: [CommonModule, NgOptimizedImage, NgComponentOutlet],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css'
})
export class ChatMessageComponent implements OnChanges {
  @Input() message!: ChatChannelMessageEvent;
  playerInfo$: Observable<PlayerInfo | null> = of(null);
  loading = false;
  segments: Segment[] = [];

  // Mapping entre le type de token et le composant à charger
  private tokenComponents: { [key: string]: Type<any> } = {
    monsterGroup: ChatModuleMonsterGroupComponent,
    chatachievement: ChatModuleChatAchievementComponent,
    subArea: ChatModuleSubAreaComponent,
    map: ChatModuleMapComponent,
    guild: ChatModuleGuildComponent,
    chatitem: ChatModuleChatItemComponent
  };

  constructor(private playerInfoService: PlayerInfoService,
              private tokenizer: ChatTokenizerService) {}

  ngOnInit() {
    this.loading = true;
    this.playerInfo$ = this.playerInfoService.getPlayerInfo(this.message.senderName).pipe(
      finalize(() => {
        this.loading = false;
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      this.segments = this.tokenizer.tokenize(this.message.content);
    }
  }

  /**
   * Retourne le composant associé au token ou un composant de secours en cas d'inconnue.
   */
  getComponent(tokenType: string): Type<any> {
    return this.tokenComponents[tokenType] || null;
  }

  trackSegment(index: number, segment: Segment): any {
    return index;
  }



}
