import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { buildGoNext } from '../../shared/router-utils';
import { Delivery } from '../delivery';
import { DeliveryService } from '../delivery.service';
import { PortList } from './ports-list';

@Component({
  selector: 'flu-from-path',
  templateUrl: './form-path.component.html'
})
export class FormPathComponent implements OnInit {

  readonly ports = PortList;

  nextStep: () => any;
  delivery: Delivery;

  constructor(private deliveryService: DeliveryService, router: Router) {
    const goNext = buildGoNext(router, '/nouveau-transport/delai-de-planche');

    this.nextStep = () => {
      this.deliveryService.save(this.delivery);
      return goNext();
    }
  }

  ngOnInit() {
    this.delivery = this.deliveryService.get();
  }
}
