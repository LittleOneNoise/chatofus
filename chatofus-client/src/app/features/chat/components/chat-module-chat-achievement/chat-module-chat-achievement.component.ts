import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-chat-module-chat-achievement',
  imports: [],
  templateUrl: './chat-module-chat-achievement.component.html',
  styleUrl: './chat-module-chat-achievement.component.css'
})
export class ChatModuleChatAchievementComponent {
  @Input() achievementId!: string;
}
