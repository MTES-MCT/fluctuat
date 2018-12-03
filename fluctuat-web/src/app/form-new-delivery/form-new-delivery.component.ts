import { Component, OnInit } from '@angular/core';
import { Delivery } from './delivery';
import { DeliveryService } from './delivery.service';

@Component({
  selector: 'flu-form-new-path',
  templateUrl: './form-new-delivery.component.html'
})
export class FormNewDeliveryComponent implements OnInit {

  delivery: Delivery = new Delivery();

  constructor(private deliveryService: DeliveryService) {
  }

  ngOnInit() {
    this.delivery = this.deliveryService.get();
  }

  save() {
    this.deliveryService.save(this.delivery)
  }
}
