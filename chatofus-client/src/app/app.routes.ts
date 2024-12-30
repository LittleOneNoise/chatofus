import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: 'chat', loadComponent: () => import('./features/chat/chat.component').then(m => m.ChatComponent) },
  { path: 'wanted', loadComponent: () => import('./features/wanted/wanted.component').then(m => m.WantedComponent) },
  { path: 'portals', loadComponent: () => import('./features/portals/portals.component').then(m => m.PortalsComponent) }
];
