import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../../shared/models/person.model';
import { Contacts } from '../../../shared/models/contacts';
import { FluValidators } from '../../../../core/form-validators/flu-validators';
import { Waybill } from '../../../shared/models/waybill.model';
import { PortList } from '../../../shared/ports-list';

@Component({
  selector: 'flu-waybill-order-form',
  templateUrl: './waybill-order-form.component.html'
})
export class WaybillOrderFormComponent {

  waybillForm: FormGroup;

  @Input()
  contacts: Contacts;

  readonly ports = PortList;

  constructor(private formBuilder: FormBuilder) {
  }

  setValue(waybill: Waybill) {
    this.fillForm(waybill);
  }

  fillForm(waybill: Waybill) {
    this.waybillForm = this.formBuilder.group({
      order: this.formBuilder.group({
        customer: this.fillPersonForm(waybill.order.customer),
        sender: this.fillPersonForm(waybill.order.sender),
        receiver: this.fillPersonForm(waybill.order.receiver),
        transporter: this.fillPersonForm(waybill.order.transporter),
        ship: this.formBuilder.group({
          name: [waybill.order.ship.name],
          regNumber: [waybill.order.ship.regNumber]
        })
      }),
      loadInfo: this.formBuilder.group({
        origin: [waybill.loadInfo.origin],
        destination: [waybill.loadInfo.destination],
        arrivalDate: [waybill.loadInfo.arrivalDate],
        merchandiseType: [waybill.loadInfo.merchandiseType],
        merchandisePrice: [waybill.loadInfo.merchandisePrice, FluValidators.quantity],
        loadManager: this.formBuilder.group({
          email: [waybill.loadInfo.loadManager.email, Validators.email]
        })
      }),
      unloadInfo: this.formBuilder.group({
        loadManager: this.formBuilder.group({
          email: [waybill.unloadInfo.loadManager.email, Validators.email]
        })
      })
    })
  }

  fillPersonForm(person: Person) {
    return this.formBuilder.group({
      name: [person.name],
      email: [person.email, Validators.email],
      cellphone: [person.cellphone, FluValidators.frenchPhone]
    })
  }

  getValue(): Waybill {
    return this.waybillForm.value;
  }

  hasError(formValue) {
    return formValue.invalid && (formValue.dirty || formValue.touched)
  }

}
