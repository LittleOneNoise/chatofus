import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-chat-module-chat-item',
  imports: [
    NgIf
  ],
  templateUrl: './chat-module-chat-item.component.html',
  styleUrl: './chat-module-chat-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatModuleChatItemComponent {
  @Input() label: string | null= null;
}
