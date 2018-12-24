import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeliveryService } from '../../providers/delivery.service';
import { Delivery } from '../../shared/model/delivery.model';
import { buildGoNext } from '../../shared/router-utils';

@Component({
  selector: 'flu-form-customer',
  templateUrl: './form-customer.component.html'
})
export class FormCustomerComponent implements OnInit {

  delivery: Delivery;

  nextStep: () => any;

  constructor(private deliveryService: DeliveryService, router: Router) {
    const goNext = buildGoNext(router, '/nouveau-transport/marchandise');

    this.nextStep = () => {
      this.deliveryService.save(this.delivery);
      return goNext();
    }
  }

  ngOnInit() {
    this.delivery = this.deliveryService.get();
  }
}
