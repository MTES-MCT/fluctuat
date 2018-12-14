import { Injectable } from '@angular/core';

import { Delivery } from './delivery';

@Injectable()
export class DeliveryService {

  save(delivery: Delivery) {
    localStorage.delivery = JSON.stringify(delivery)
  }

  get() {
    return localStorage.delivery ? JSON.parse(localStorage.delivery) : new Delivery();
  }
}
