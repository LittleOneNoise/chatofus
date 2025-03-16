import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {DofusdbService} from '../../../../services/dofusdb.service';

@Component({
  selector: 'app-chat-module-chat-achievement',
  imports: [
    AsyncPipe
  ],
  templateUrl: './chat-module-chat-achievement.component.html',
  styleUrl: './chat-module-chat-achievement.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatModuleChatAchievementComponent implements OnInit {
  @Input() achievementId!: string;
  achievementLabel$: Observable<string | null> = of(null);

  constructor(private dofusdbService: DofusdbService) {}

  ngOnInit(): void {
    this.achievementLabel$ = this.dofusdbService.getAchievementInfo(this.achievementId).pipe(
      map(achievementInfo => achievementInfo?.label ?? null),
    )
  }

}
