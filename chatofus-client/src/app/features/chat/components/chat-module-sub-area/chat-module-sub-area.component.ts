import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {DofusdbService} from '../../../../services/dofusdb.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-chat-module-sub-area',
  imports: [
    AsyncPipe
  ],
  templateUrl: './chat-module-sub-area.component.html',
  styleUrl: './chat-module-sub-area.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatModuleSubAreaComponent {
  @Input() subareaId!: string;
  subareaLabel$: Observable<string | null> = of(null);

  constructor(private dofusdbService: DofusdbService) {}

  ngOnInit(): void {
    this.subareaLabel$ = this.dofusdbService.getSubareaInfo(this.subareaId).pipe(
      map(subareaInfo => subareaInfo.label),
    )
  }
}
