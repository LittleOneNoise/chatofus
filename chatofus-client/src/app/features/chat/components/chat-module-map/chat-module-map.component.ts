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
  @Input() position_x: string = '0';
  @Input() position_y: string = '0';
  @Input() label: string | undefined = undefined;
}
