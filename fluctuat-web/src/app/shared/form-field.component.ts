import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'flu-form-field',
  template: `<div class="field">
               <div class="control">
                 <ng-content></ng-content>
               </div>
             </div>`,
  styles: [':host {display: block}', ':host:not(:last-child) {margin-bottom: 0.75rem}']
})
export class FormFieldComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
