import { Component, Input } from '@angular/core';
import { Contract } from '../../../shared/model/contract.model';

@Component({
  selector: 'flu-delivery-activity',
  templateUrl: './delivery-activity.component.html'
})
export class DeliveryActivityComponent {

  @Input()
  contract: Contract;

}
