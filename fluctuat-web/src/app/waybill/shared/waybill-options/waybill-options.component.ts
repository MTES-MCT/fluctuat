import { Component, Input } from '@angular/core';
import { Waybill } from '../models/waybill.model';

@Component({
  selector: 'flu-waybill-options',
  templateUrl: './waybill-options.component.html'
})
export class WaybillOptionsComponent {

  @Input()
  waybill: Waybill;

  isNotLoadStarted(waybill: Waybill) {
    return !waybill.loadInfo.sentAt;
  }

  isNotLoadFinished(waybill: Waybill) {
    return waybill.loadInfo.sentAt && !waybill.loadInfo.validatedAt;
  }

  isLoadFinished(waybill: Waybill) {
    return waybill.loadInfo.validatedAt
  }

  isNotUnloadStarted(waybill: Waybill) {
    return this.isLoadFinished(waybill) && !waybill.unloadInfo.sentAt
  }

  isNotUnloadFinished(waybill: Waybill) {
    return waybill.unloadInfo.sentAt && !waybill.unloadInfo.validatedAt
  }

  isUnloadFinished(waybill: Waybill) {
    return waybill.unloadInfo.validatedAt
  }

}
