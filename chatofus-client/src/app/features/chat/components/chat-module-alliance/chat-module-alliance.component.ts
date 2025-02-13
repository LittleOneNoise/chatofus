import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-chat-module-alliance',
  imports: [
    NgIf
  ],
  templateUrl: './chat-module-alliance.component.html',
  styleUrl: './chat-module-alliance.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatModuleAllianceComponent {
  @Input() label: string | null = null;
}
