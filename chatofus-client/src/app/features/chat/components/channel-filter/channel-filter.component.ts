import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Channel} from '../../../../dto/chatChannelMessageEvent';
import {NgForOf} from '@angular/common';
import {FilterButtonComponent} from '../filter-button/filter-button.component';

@Component({
  selector: 'app-channel-filter',
  imports: [
    NgForOf,
    FilterButtonComponent
  ],
  templateUrl: './channel-filter.component.html',
  styleUrl: './channel-filter.component.css'
})
export class ChannelFilterComponent {
  @Input() activeChannels: Channel[] = [];
  @Output() channelToggle = new EventEmitter<Channel>();

  // Liste des canaux avec des libellés
  channels: { id: Channel; label: string; className: string }[] = [
    { id: Channel.SEEK, label: 'Recrutement', className: 'seek' },
    { id: Channel.SALES, label: 'Commerce', className: 'sales' },
    { id: Channel.INFO, label: 'Informations', className: 'info' }
  ];

  toggleChannel(channel: Channel): void {
    this.channelToggle.emit(channel);
  }
}

