import { Component, HostListener } from '@angular/core';
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate(300)]),
      transition(':leave', [animate(500)]),
    ]),
  ],
})
export class AppComponent {
  title = 'project-management-app';

  @HostListener('window:scroll', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onWindowScroll(_event: Event) {
    let element = document.getElementById('header') as HTMLElement;
    if (window.pageYOffset + 50 > element.offsetTop + element.clientHeight) {
      element.classList.add('sticky');
    } else {
      element.classList.remove('sticky');
    }
  }
}
