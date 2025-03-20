import { animate, style, transition, trigger } from '@angular/animations';

// This is the animation which scales up / zooms in while having a fadding in effect
export const scaleUpAnimation = trigger('scaleUpAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate(
      '500ms ease-in-out',
      style({ opacity: 1, transform: 'scale(1.0)' })
    ),
  ]),
]);
