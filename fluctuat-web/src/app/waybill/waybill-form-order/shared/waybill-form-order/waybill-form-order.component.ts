import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Person } from '../../../shared/models/person.model';
import { Contacts } from '../../../shared/models/contacts.model';
import { FluValidators } from '../../../../core/form-validators/flu-validators';
import { PortList } from '../../../shared/ports-list';
import { OrderInfo } from '../../../shared/models/order-info.model';

@Component({
  selector: 'flu-waybill-form-order',
  templateUrl: './waybill-form-order.component.html'
})
export class WaybillFormOrderComponent {

  orderForm: FormGroup;

  @Input()
  contacts: Contacts;

  readonly ports = PortList;

  constructor(private formBuilder: FormBuilder) {
  }

  setValue(order: OrderInfo) {
    this.orderForm = this.formBuilder.group({
      customer: this.fillPersonForm(order.customer),
      sender: this.fillPersonForm(order.sender),
      receiver: this.fillPersonForm(order.receiver),
      middleman: this.formBuilder.group({
        name: [order.middleman.name],
        email: [order.middleman.email, [Validators.email, FluValidators.withDomain]],
        isBroker: [order.middleman.isBroker]
      }),
      transporter: this.formBuilder.group({
        name: [order.transporter.name],
        email: [order.transporter.email, [Validators.email, FluValidators.withDomain]],
        cellphone: [order.transporter.cellphone, FluValidators.frenchPhone]
      }),
      ship: this.formBuilder.group({
        name: [order.ship.name],
        regNumber: [order.ship.regNumber]
      }),
      originInfo: this.formBuilder.group({
        port: [order.originInfo.port],
        expectedDate: [order.originInfo.expectedDate],
        email: [order.originInfo.email, [Validators.email, FluValidators.withDomain]],
      }),
      destinationInfo: this.formBuilder.group({
        port: [order.destinationInfo.port],
        expectedDate: [order.destinationInfo.expectedDate],
        email: [order.destinationInfo.email, [Validators.email, FluValidators.withDomain]]
      }),
      merchandise: this.formBuilder.group({
        nature: [order.merchandise.nature],
        weight: [order.merchandise.weight, FluValidators.quantity],
        price: [order.merchandise.price, FluValidators.quantity]
      })
    });
  }

  fillPersonForm(person: Person) {
    return this.formBuilder.group({
      name: [person.name],
      email: [person.email, [Validators.email, FluValidators.withDomain]]
    });
  }

  getValue(): OrderInfo {
    return this.orderForm.value;
  }


  autocompleteByName(control: AbstractControl, values = []) {
    const name = control.get('name').value;
    const matchValue = values.find(item => item.name === name);
    if (matchValue && name) {
      control.setValue(matchValue);
    }
  }
}
