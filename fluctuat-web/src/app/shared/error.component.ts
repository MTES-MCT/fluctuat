import { Component, Input } from '@angular/core';

@Component({
  selector: 'flu-error',
  template: `<div class="level" *ngIf="errorMsg"></div>
             <div class="level" *ngIf="errorMsg">
               <div class="level-item notification is-danger">{{errorMsg}}</div>
             </div>`
})
export class ErrorComponent {

  @Input()
  errorMsg: string;

}
