import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'chat', pathMatch: 'full' }, // Redirige la route racine vers /chat
  { path: 'chat', component: ChatComponent }
];
