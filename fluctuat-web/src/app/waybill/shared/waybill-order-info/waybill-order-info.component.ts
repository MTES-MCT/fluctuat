import { Component, Input } from '@angular/core';
import { OrderInfo } from '../models/order-info.model';

@Component({
  selector: 'flu-waybill-order-info',
  templateUrl: './waybill-order-info.component.html',
  styles: ['strong { text-transform: uppercase }']
})
export class WaybillOrderInfoComponent {

  @Input()
  order: OrderInfo;

}
