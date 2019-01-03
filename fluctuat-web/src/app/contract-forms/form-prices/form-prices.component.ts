import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { DeliveryService } from '../../providers/delivery.service';
import { Delivery } from '../../shared/model/delivery.model';
import { buildGoNext } from '../../shared/router-utils';
import { AbstractForm } from '../abstract-form';

@Component({
  selector: 'flu-form-prices',
  templateUrl: './form-prices.component.html'
})
export class FormPricesComponent extends AbstractForm implements OnInit {

  @ViewChild('formPrices')
  form: NgForm;

  delivery: Delivery;

  nextStep: () => any;

  constructor(private deliveryService: DeliveryService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.delivery = this.deliveryService.get();

    const goNext = buildGoNext(this.router, '/nouveau-transport/confirmation-transport');

    this.nextStep = () => {
      this.deliveryService.save(this.delivery);
      return goNext();
    }
  }
}
