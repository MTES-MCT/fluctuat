import { Component, Input } from '@angular/core';
import { Contract } from '../../../shared/model/contract.model';

@Component({
  selector: 'flu-waybill-activity',
  templateUrl: './waybill-activity.component.html'
})
export class WaybillActivityComponent {

  @Input()
  contract: Contract;

}
