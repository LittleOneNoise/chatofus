import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Channel} from '../../../../dto/chatChannelMessageEvent';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-filter-button',
  imports: [
    NgClass
  ],
  templateUrl: './filter-button.component.html',
  styleUrl: './filter-button.component.css'
})
export class FilterButtonComponent {
  // Informations du canal : id, label, et className pour la couleur.
  @Input() channel!: { id: Channel; label: string; className: string };

  // Indique si le canal est actif.
  @Input() active: boolean = false;

  // Emet l'identifiant du canal lors d'un clic.
  @Output() toggle: EventEmitter<Channel> = new EventEmitter<Channel>();

  get buttonClasses(): string {
    if (this.active) {
      // Lorsque le canal est actif, on utilise la couleur du canal (classe générée par Tailwind)
      // en plus des styles définis pour un bouton actif.
      return `bg-chat-channel-${this.channel.className} active-button`;
    } else {
      return 'inactive-button';
    }
  }

  onClick(): void {
    this.toggle.emit(this.channel.id);
  }
}
