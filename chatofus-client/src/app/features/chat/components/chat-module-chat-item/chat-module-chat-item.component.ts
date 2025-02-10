import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-chat-module-chat-item',
  imports: [],
  templateUrl: './chat-module-chat-item.component.html',
  styleUrl: './chat-module-chat-item.component.css'
})
export class ChatModuleChatItemComponent {
  @Input() label: string = 'Item';
}
