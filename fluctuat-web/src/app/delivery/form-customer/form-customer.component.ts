import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { buildGoNext } from '../../shared/router-utils';
import { Delivery } from '../delivery';
import { DeliveryService } from '../delivery.service';

@Component({
  selector: 'flu-form-customer',
  templateUrl: './form-customer.component.html'
})
export class FormCustomerComponent implements OnInit {

  delivery: Delivery;

  nextStep: () => any;

  constructor(private deliveryService: DeliveryService, router: Router) {
    const goNext = buildGoNext(router, '/marchandise');

    this.nextStep = () => {
      this.deliveryService.save(this.delivery);
      return goNext();
    }
  }

  ngOnInit() {
    this.delivery = this.deliveryService.get();
  }
}
