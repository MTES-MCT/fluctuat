import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../../shared/models/person.model';
import { Contacts } from '../../../shared/models/contacts';
import { FluValidators } from '../../../../core/form-validators/flu-validators';
import { Waybill } from '../../../shared/models/waybill.model';
import { PortList } from '../../../shared/ports-list';
import { WaybillOrderFormValue } from './waybill-order-form-value';

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
      originInfo: this.formBuilder.group({
        origin: [waybill.loadInfo.origin],
        loadManagerEmail: [waybill.loadInfo.loadManager.email, Validators.email],
      }),
      destinationInfo: this.formBuilder.group({
        destination: [waybill.loadInfo.destination],
        arrivalDate: [waybill.loadInfo.arrivalDate],
        loadManagerEmail: [waybill.unloadInfo.loadManager.email, Validators.email]
      }),
      merchandiseInfo: this.formBuilder.group({
        merchandiseType: [waybill.loadInfo.merchandiseType],
        merchandisePrice: [waybill.loadInfo.merchandisePrice, FluValidators.quantity],
      }),
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
    const formValue: WaybillOrderFormValue = this.waybillForm.value;

    const waybill = new Waybill();
    waybill.order = formValue.order;

    const loadInfo = waybill.loadInfo;
    loadInfo.origin = formValue.originInfo.origin;
    loadInfo.destination = formValue.destinationInfo.destination;
    loadInfo.arrivalDate = formValue.destinationInfo.arrivalDate;
    loadInfo.merchandiseType = formValue.merchandiseInfo.merchandiseType;
    loadInfo.merchandisePrice = formValue.merchandiseInfo.merchandisePrice;
    loadInfo.loadManager.email = formValue.originInfo.loadManagerEmail;

    const unloadInfo = waybill.unloadInfo;
    unloadInfo.loadManager.email = formValue.destinationInfo.loadManagerEmail;

    return waybill;
  }

}
