import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotifyService } from '../shared/notify.service';

@Component({
  selector: 'flu-waybill-share',
  templateUrl: './waybill-share.component.html'
})
export class WaybillShareComponent {

  active: boolean;

  phone: string;

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

  closeModal() {
    this.show = false;
  }

  send() {
    this.notifyService.sendNotification({ waybillId: this.waybillId, phone: this.phone }).subscribe((result => {
      console.log('send sms', this.phone);
      this.closeModal();
    }), console.error)
  }

}
