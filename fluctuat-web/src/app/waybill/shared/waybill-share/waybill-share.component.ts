import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotifyService } from '../notify.service';
import { ResultHelper } from '../../../core/result-helper';
import { GENERIC_ERROR_MSG } from '../../../core/generic-error';
import { WaybillNotify } from '../models/waybill-notify.model';

@Component({
  selector: 'flu-waybill-share',
  templateUrl: './waybill-share.component.html'
})
export class WaybillShareComponent {

  active: boolean;

  result: ResultHelper = new ResultHelper();

  sent: boolean;

  constructor(private notifyService: NotifyService) {
  }

  @Input()
  set show(value) {
    this.active = value;
    this.showChange.emit(this.active);
  }

  @Input()
  waybillNotify: WaybillNotify;

  @Output()
  showChange = new EventEmitter();

  hasError(formValue) {
    return formValue.invalid && (formValue.dirty || formValue.touched);
  }

  /** form is valid if almost one field is set up and form are valid */
  isInvalidForm(form) {
    return form.invalid || !form.value.phone && !form.value.email;
  }

  @HostListener('click', ['$event.target'])
  closeModal(element?) {
    if (!element || element.className === 'modal-background') {
      this.show = false;
    }
  }

  send() {
    this.result.waiting();

    this.notifyService.sendNotification(this.waybillNotify)
      .pipe(catchError(() => throwError(GENERIC_ERROR_MSG)))
      .subscribe(() => {
        this.sent = true;
        this.result.success();
      }, error => this.result.error(error));
  }
}
