import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotifyService } from '../shared/notify.service';
import { ResultHelper } from '../../core/result-helper';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { GENERIC_ERROR_MSG } from '../../core/generic-error';

@Component({
  selector: 'flu-waybill-share',
  templateUrl: './waybill-share.component.html'
})
export class WaybillShareComponent {

  active: boolean;

  phoneValue: string;

  result: ResultHelper = new ResultHelper();

  constructor(private notifyService: NotifyService) {
  }

  @Input()
  set show(value) {
    this.active = value;
    this.showChange.emit(this.active);
  }

  @Input()
  waybillId: string;

  @Output()
  showChange = new EventEmitter();

  hasError(formValue) {
    return formValue.invalid && (formValue.dirty || formValue.touched)
  }

  closeModal() {
    this.show = false;
  }

  send() {
    this.result.waiting();

    this.notifyService.sendNotification({ waybillId: this.waybillId, cellphone: this.phoneValue }).pipe(
      catchError((errorResponse) => {
        console.log(errorResponse);
        return throwError(GENERIC_ERROR_MSG);
      }))
      .subscribe(() => {
        console.log('send sms', this.phoneValue);
        this.result.success();
        this.closeModal();
      }, error => this.result.error(error))
  }

}
