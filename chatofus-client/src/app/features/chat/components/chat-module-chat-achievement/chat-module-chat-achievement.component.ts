import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {AchievementInfoService} from '../../../../services/achievement-info.service';

@Component({
  selector: 'app-chat-module-chat-achievement',
  imports: [],
  templateUrl: './chat-module-chat-achievement.component.html',
  styleUrl: './chat-module-chat-achievement.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatModuleChatAchievementComponent implements OnInit {
  @Input() achievementId!: string;
  achievementLabel?: string | null;

  constructor(private achievementInfoService: AchievementInfoService) {}

  ngOnInit(): void {
    this.achievementInfoService.getAchievementInfo(this.achievementId)
      .subscribe({
        next: value => this.achievementLabel = value.label,
        error: err => {
          console.error('Erreur lors du chargement du label du succès', err);
        }
      });
  }

}
