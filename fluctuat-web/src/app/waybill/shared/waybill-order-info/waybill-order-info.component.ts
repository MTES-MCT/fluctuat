import { Component, Input } from '@angular/core';
import { OrderInfo } from '../models/order-info.model';

@Component({
  selector: 'flu-waybill-order-info',
  templateUrl: './waybill-order-info.component.html'
})
export class WaybillOrderInfoComponent {

  @Input()
  order: OrderInfo

}
