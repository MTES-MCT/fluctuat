import { Component, Input } from '@angular/core';

@Component({
  selector: 'flu-error',
  template: `<div class="level" style="margin-top: 1.5rem" *ngIf="errorMsg">
               <div class="level-item notification is-danger">
                 {{errorMsg}}
                 <button class="delete" *ngIf="closable !== undefined" (click)="clearError()"></button>
               </div>
             </div>`
})
export class ErrorComponent {

  @Input()
  errorMsg: string;

  @Input()
  closable: boolean;

  clearError() {
    this.errorMsg = undefined;
  }

}
