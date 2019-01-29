import { Component } from '@angular/core';

@Component({
  selector: 'flu-success',
  template: `<div class="level"></div>
             <div class="level">
               <div class="level-item notification is-success has-text-black-ter">
                 <ng-content></ng-content>
               </div>
             </div>`
})
export class SuccessComponent {
}
