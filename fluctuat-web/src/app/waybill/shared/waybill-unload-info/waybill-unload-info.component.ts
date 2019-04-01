import { Component, Input } from '@angular/core';
import { Waybill } from '../models/waybill.model';

@Component({
  selector: 'flu-waybill-unload-info',
  templateUrl: './waybill-unload-info.component.html',
  styles: ['strong { text-transform: uppercase }']
})
export class WaybillUnloadInfoComponent {

  @Input()
  waybill: Waybill;

}
