import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-portal-card',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './portal-card.component.html',
  styleUrl: './portal-card.component.css'
})
export class PortalCardComponent {

  portalLabel = 'Enutrosor';
  portalPosX = '30';
  portalPosY = '-48';
  dimensionIcon = 'assets/images/xelorium-icon.png'; // Chemin vers l'icône/illustration de la dimension

  nearestZaapPosX = '35';
  nearestZaapPosY = '-50';
  nearestZaapLabel = 'Route Rocailleuses (Plaines de Cania)';

  playerClass = 'playerClass';
  playerLevel = 200;
  playerPseudo = 'Kevin';
  playerMessage = '[30,-48] Portail vers la dimension Enutrosor';

}
