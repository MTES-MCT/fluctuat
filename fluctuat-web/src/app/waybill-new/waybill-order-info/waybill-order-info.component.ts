import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrderInfo } from '../order-info.model';
import { Person } from '../person.model';

@Component({
  selector: 'flu-waybill-order-info',
  templateUrl: './waybill-order-info.component.html'
})
export class WaybillOrderInfoComponent {

  orderForm: FormGroup;

  constructor(private fromBuilder: FormBuilder) {
  }

  setValue(order: OrderInfo) {
    this.fillForm(order);
  }

  fillForm(orderInfo: OrderInfo) {
    this.orderForm = this.fromBuilder.group({
      customer: this.fillPersonForm(orderInfo.customer),
      sender: this.fillPersonForm(orderInfo.sender),
      receiver: this.fillPersonForm(orderInfo.receiver),
      transporter: this.fillPersonForm(orderInfo.transporter),
      ship: this.fromBuilder.group({
        name: [orderInfo.ship.name],
        regNumber: [orderInfo.ship.regNumber]
      })
    })
  }

  fillPersonForm(person: Person) {
    return this.fromBuilder.group({
      name: [person.name],
      email: [person.email, Validators.email]
    })
  }

  getValue() {
    return this.orderForm.value;
  }

}
