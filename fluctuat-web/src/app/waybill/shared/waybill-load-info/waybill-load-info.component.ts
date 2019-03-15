import { Component, Input } from '@angular/core';
import { Waybill } from '../models/waybill.model';

@Component({
  selector: 'flu-waybill-load-info',
  templateUrl: './waybill-load-info.component.html',
  styles: ['strong { text-transform: uppercase }']
})
export class WaybillLoadInfoComponent {

  @Input()
  waybill: Waybill

}
