import { Injectable } from '@angular/core';
import { Delivery } from '../shared/model/delivery.model';

@Injectable()
export class DeliveryService {

  save(delivery: Delivery) {
    sessionStorage.delivery = JSON.stringify(delivery)
  }

  get() {
    return sessionStorage.delivery ? JSON.parse(sessionStorage.delivery) : new Delivery();
  }

  clear() {
    delete sessionStorage.delivery;
  }
}
