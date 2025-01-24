import {Component} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NgOptimizedImage,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  version = environment.version;

}
