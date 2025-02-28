import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-chat-module-guild',
  imports: [
    NgIf
  ],
  templateUrl: './chat-module-guild.component.html',
  styleUrl: './chat-module-guild.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatModuleGuildComponent {
  @Input() label: string | null = null;
}
