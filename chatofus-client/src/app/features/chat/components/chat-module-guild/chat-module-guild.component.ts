import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-chat-module-guild',
  imports: [],
  templateUrl: './chat-module-guild.component.html',
  styleUrl: './chat-module-guild.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatModuleGuildComponent {
  @Input() label: string = 'guild';
}
