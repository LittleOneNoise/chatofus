import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-chat-module-sub-area',
  imports: [],
  templateUrl: './chat-module-sub-area.component.html',
  styleUrl: './chat-module-sub-area.component.css'
})
export class ChatModuleSubAreaComponent {
  @Input() areaId!: string;
}
