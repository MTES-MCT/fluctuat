import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { DeliveryService } from '../../providers/delivery.service';
import { AbstractForm } from '../abstract-form';
import { Delivery } from '../../shared/model/delivery.model';
import { buildGoNext } from '../../shared/router-utils';


@Component({
  selector: 'flu-form-load-delay',
  templateUrl: './form-load-delay.component.html'
})
export class FormLoadDelayComponent extends AbstractForm implements OnInit {

  @ViewChild('formLoadDelay')
  form: NgForm;

  delivery: Delivery;

  nextStep: () => any;

  constructor(private deliveryService: DeliveryService, private router: Router) {
    super()
  }

  ngOnInit() {
    this.delivery = this.deliveryService.get();

    const goNext = buildGoNext(this.router, '/nouveau-transport/conditions-tarifaires');

    this.nextStep = () => {
      this.deliveryService.save(this.delivery);
      return goNext();
    }
  }
}
