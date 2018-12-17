import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { buildGoNext } from '../../shared/router-utils';
import { Delivery } from '../delivery';
import { DeliveryService } from '../delivery.service';

@Component({
  selector: 'flu-form-merchandise',
  templateUrl: './form-merchandise.component.html'
})
export class FormMerchandiseComponent implements OnInit {

  nextStep: () => any;
  delivery: Delivery;

  constructor(private deliveryService: DeliveryService, router: Router) {
    const goNext = buildGoNext(router, '/nouveau-transport/trajet');

    this.nextStep = () => {
      this.deliveryService.save(this.delivery);
      return goNext();
    }
  }

  ngOnInit() {
    this.delivery = this.deliveryService.get();
  }
}
