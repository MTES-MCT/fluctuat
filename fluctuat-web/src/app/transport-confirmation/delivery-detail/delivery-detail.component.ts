import { Component, Input } from '@angular/core';

import { Delivery } from '../../shared/model/delivery.model';

@Component({
  selector: 'flu-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styleUrls: [ './delivery-detail.component.sass' ]
})
export class DeliveryDetailComponent {

  @Input()
  delivery: Delivery;

}
