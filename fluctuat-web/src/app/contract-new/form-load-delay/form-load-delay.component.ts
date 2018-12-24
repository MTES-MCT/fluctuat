import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeliveryService } from '../../providers/delivery.service';
import { Delivery } from '../../shared/model/delivery.model';
import { buildGoNext } from '../../shared/router-utils';


@Component({
  selector: 'flu-form-load-delay',
  templateUrl: './form-load-delay.component.html'
})
export class FormLoadDelayComponent implements OnInit {

  nextStep: () => any;
  delivery: Delivery;

  constructor(private deliveryService: DeliveryService, router: Router) {
    const goNext = buildGoNext(router, '/nouveau-transport/conditions-tarifaires');

    this.nextStep = () => {
      this.deliveryService.save(this.delivery);
      return goNext();
    }
  }

  ngOnInit() {
    this.delivery = this.deliveryService.get();
  }
}
