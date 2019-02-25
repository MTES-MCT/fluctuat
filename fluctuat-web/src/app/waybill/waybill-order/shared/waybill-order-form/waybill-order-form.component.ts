import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderInfo } from '../../../shared/models/order-info.model';
import { Person } from '../../../shared/models/person.model';
import { Contacts } from '../../../shared/models/contacts';
import { FluValidators } from '../../../../core/form-validators/flu-validators';

@Component({
  selector: 'flu-waybill-order-form',
  templateUrl: './waybill-order-form.component.html'
})
export class WaybillOrderFormComponent {

  orderForm: FormGroup;

  @Input()
  contacts: Contacts;

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
      email: [person.email, Validators.email],
      cellphone: [person.cellphone, FluValidators.frenchPhone]
    })
  }

  getValue() {
    return this.orderForm.value;
  }

  hasError(formValue) {
    return formValue.invalid && (formValue.dirty || formValue.touched)
  }

}
