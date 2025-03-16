import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {DecimalPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-chat-average-messages',
  imports: [
    NgIf,
    DecimalPipe
  ],
  templateUrl: './chat-average-messages.component.html',
  styleUrl: './chat-average-messages.component.css'
})
export class ChatAverageMessagesComponent implements OnInit, OnDestroy {

  @Input() messageStream!: Observable<any>;
  averageMessagesPerMinute: number = 0;
  currentWindow: number = 0;
  private subscription!: Subscription;
  private intervalId: any;
  private startTime: number = 0;
  private messageTimestamps: number[] = [];

  ngOnInit() {
    this.startTime = Date.now();

    // Abonnement au flux de messages
    if (this.messageStream) {
      this.subscription = this.messageStream.subscribe(() => {
        // À chaque nouveau message, on enregistre le timestamp
        this.messageTimestamps.push(Date.now());
      });
    }

    // Mise à jour toutes les minutes
    this.intervalId = setInterval(() => {
      const now = Date.now();

      // Purger les messages datant de plus de 5 minutes (300 000 ms)
      this.messageTimestamps = this.messageTimestamps.filter(ts => ts >= now - 300000);

      // Calcul du temps écoulé depuis le démarrage du compteur en minutes
      const elapsedMinutes = (now - this.startTime) / 60000;

      // On attend au moins 1min pour calculer la moyenne
      if (elapsedMinutes >= 1) {
        // La fenêtre d'agrégation augmente : 1 min, 2 min, ... jusqu'à 5 min max
        const windowMinutes = Math.min(Math.floor(elapsedMinutes), 5);
        this.currentWindow = windowMinutes;

        // Compter les messages dans la fenêtre actuelle
        const countWindow = this.messageTimestamps.filter(ts => ts >= now - windowMinutes * 60000).length;
        this.averageMessagesPerMinute = countWindow / windowMinutes;
      }
    }, 60000);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
