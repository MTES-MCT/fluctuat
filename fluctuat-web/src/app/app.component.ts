import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<flu-header></flu-header>
             <router-outlet></router-outlet>`,
})
export class AppComponent {
}
