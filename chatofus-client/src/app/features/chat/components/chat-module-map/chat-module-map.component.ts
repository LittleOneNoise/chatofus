import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-chat-module-map',
  imports: [
    NgIf
  ],
  templateUrl: './chat-module-map.component.html',
  styleUrl: './chat-module-map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatModuleMapComponent {
  @Input() position_x: string | null = null;
  @Input() position_y: string | null = null;
  @Input() label: string | null = null;
}
