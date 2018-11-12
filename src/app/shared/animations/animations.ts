import { trigger, state, style, transition, animate } from '@angular/animations';

const slide = (name: string, coordinate: string) => {
  return trigger(name, [
    transition(':enter', [
      style({
        opacity: 0, transform: coordinate
      }),
      animate('1.2s cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
    ])
  ]);
};

const slideDown = slide('slideDown', 'translateY(-100px)');

const slideUp = slide('slideUp', 'translateY(100px)');

const slideLeft = slide('slideLeft', 'translateX(100px)');

const slideRight = slide('slideRight', 'translateX(-100px)');

const toggle = trigger('toggle', [
  transition('visible <=> hidden', [
    animate('0.5s ease-in-out')
  ]),
  state(
    'hidden',
    style({
      height: '0',
    })
  ),
  state(
    'visible',
    style({
      height: '*',
    })
  ),
]);

export { slideDown, slideUp, slideLeft, slideRight, toggle }
