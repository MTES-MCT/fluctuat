import { Component, Input } from '@angular/core';
import { Contract } from '../../shared/model/contract.model';

@Component({
  selector: 'flu-waybill',
  templateUrl: './waybill.component.html'
})
export class WaybillComponent {

  @Input()
  contract: Contract;

}
