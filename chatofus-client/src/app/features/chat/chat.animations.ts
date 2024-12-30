import { animate, style, transition, trigger } from '@angular/animations';

export const chatAnimations = [
  trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
    ])
  ]),
  trigger('messageAnimation', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(10px)' }),
      animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ])
  ])
];
