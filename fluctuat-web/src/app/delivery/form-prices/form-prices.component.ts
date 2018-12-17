import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { buildGoNext } from '../../shared/router-utils';
import { Delivery } from '../delivery';
import { DeliveryService } from '../delivery.service';

@Component({
  selector: 'flu-form-prices',
  templateUrl: './form-prices.component.html',
  styleUrls: [ './form-prices.component.sass' ]
})
export class FormPricesComponent implements OnInit {

  nextStep: () => any;
  delivery: Delivery;

  constructor(private deliveryService: DeliveryService, router: Router) {
    const goNext = buildGoNext(router, '/nouveau-transport/resume');

    this.nextStep = () => {
      this.deliveryService.save(this.delivery);
      return goNext();
    }
  }

  ngOnInit() {
    this.delivery = this.deliveryService.get();
  }
}
