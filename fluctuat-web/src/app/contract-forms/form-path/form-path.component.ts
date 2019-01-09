import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { DeliveryService } from '../../providers/delivery.service';
import { AbstractForm } from '../abstract-form';
import { Delivery } from '../../shared/model/delivery.model';
import { buildGoNext } from '../../shared/router-utils';
import { PortList } from './ports-list';

@Component({
  selector: 'flu-from-path',
  templateUrl: './form-path.component.html'
})
export class FormPathComponent extends AbstractForm implements OnInit {

  readonly ports = PortList;

  @ViewChild('formPath')
  form: NgForm;

  delivery: Delivery;

  nextStep: () => any;

  constructor(private deliveryService: DeliveryService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.delivery = this.deliveryService.get();

    const goNext = buildGoNext(this.router, '/transporteur/nouveau-transport/delai-de-planche');

    this.nextStep = () => {
      this.deliveryService.save(this.delivery);
      return goNext();
    }
  }
}
