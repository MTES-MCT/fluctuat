import { Component, Input } from '@angular/core';
import { LoadInfo } from '../models/load-info.model';

@Component({
  selector: 'flu-waybill-load-info',
  templateUrl: './waybill-load-info.component.html'
})
export class WaybillLoadInfoComponent {

  @Input()
  loadInfo: LoadInfo

}
