import { Component } from '@angular/core';

@Component({
  selector: 'flu-hero-container',
  template: `
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <ng-content></ng-content>
        </div>
      </div>
    </section>`
})
export class HeroContainerComponent {
}
