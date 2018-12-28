import { Component, Input } from '@angular/core';
import { Contract } from '../../../shared/model/contract.model';

@Component({
  selector: 'flu-delivery-detail',
  templateUrl: './delivery-detail.component.html'
})
export class DeliveryDetailComponent {

  @Input()
  contract: Contract;

}
