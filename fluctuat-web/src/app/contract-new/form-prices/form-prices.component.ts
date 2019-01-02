import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryService } from '../../providers/delivery.service';
import { AbstractForm } from '../../shared/abstract-form';
import { Delivery } from '../../shared/model/delivery.model';
import { buildGoNext } from '../../shared/router-utils';

@Component({
  selector: 'flu-form-prices',
  templateUrl: './form-prices.component.html',
  styleUrls: [ './form-prices.component.sass' ]
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
