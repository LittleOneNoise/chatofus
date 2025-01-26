import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Channel} from '../../../../dto/chatChannelMessageEvent';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-channel-filter',
  imports: [
    NgForOf,
    NgClass
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
    { id: Channel.EVENT, label: 'Evénement', className: 'event' },
    { id: Channel.INFO, label: 'Informations', className: 'info' },
    { id: Channel.ADS, label: 'Promotions', className: 'ads' },
    { id: Channel.ADMIN, label: 'Admin', className: 'admin' }
  ];

  toggleChannel(channel: Channel): void {
    this.channelToggle.emit(channel);
  }
}

