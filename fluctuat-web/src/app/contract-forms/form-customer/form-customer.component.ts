import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { DeliveryService } from '../../providers/delivery.service';
import { AbstractForm } from '../abstract-form';
import { Delivery } from '../../shared/model/delivery.model';
import { buildGoNext } from '../../shared/router-utils';

@Component({
  selector: 'flu-form-customer',
  templateUrl: './form-customer.component.html'
})
export class FormCustomerComponent extends AbstractForm implements OnInit {

  @ViewChild('formCustomer')
  form: NgForm;

  delivery: Delivery;

  nextStep: () => any;

  constructor(private deliveryService: DeliveryService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.delivery = this.deliveryService.get();

    const goNext = buildGoNext(this.router, '/transporteur/nouveau-transport/marchandise');

    this.nextStep = () => {
      this.deliveryService.save(this.delivery);
      return goNext();
    }
  }
}
