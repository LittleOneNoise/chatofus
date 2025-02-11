import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-chat-module-monster-group',
  imports: [],
  templateUrl: './chat-module-monster-group.component.html',
  styleUrl: './chat-module-monster-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatModuleMonsterGroupComponent {
  @Input() position_x: string = '0';
  @Input() position_y: string = '0';
  @Input() label: string = 'MonsterGroup';
}
