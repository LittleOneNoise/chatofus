import {Component} from '@angular/core';
import {PortalCardComponent} from './components/portal-card/portal-card.component';

@Component({
  selector: 'app-portals',
  imports: [
    PortalCardComponent
  ],
  templateUrl: './portals.component.html',
  styleUrl: './portals.component.css'
})
export class PortalsComponent {

}
