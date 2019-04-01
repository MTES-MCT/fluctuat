import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { WaybillOrderFormComponent } from './waybill-order-form.component';
import { FormFieldComponent } from '../../../../shared/form-field.component';
import { DatetimePickerDirective } from '../../../../shared/datetime-picker.directive';
import { OrderInfo } from '../../../shared/models/order-info.model';
import { DatePickerDirective } from '../../../../shared/date-picker.directive';
import { buildPerson } from '../../../../../test.utils';

describe('WaybillOrderFormComponent', () => {
  let component: WaybillOrderFormComponent;
  let fixture: ComponentFixture<WaybillOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WaybillOrderFormComponent,
        FormFieldComponent,
        DatetimePickerDirective,
        DatePickerDirective
      ],
      imports: [ReactiveFormsModule]
    });

    fixture = TestBed.createComponent(WaybillOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map correctly between waybill order and form', () => {

    const order = new OrderInfo();
    order.customer = buildPerson('customer name', 'customer@test');
    order.sender = buildPerson('sender name', 'sender@test');
    order.receiver = buildPerson('receiver name', 'receiver@test');
    order.middleman = { name: 'a broker', email: 'broker@test', isBroker: true };
    order.transporter = { name: 'transporter name', email: 'trasporter@test', cellphone: '123456' };
    order.ship = { name: 'shipname', regNumber: 'FR 123' };
    order.merchandise = { nature: 'ble', price: '2', weight: '42' };
    order.originInfo = { port: 'origin port', expectedDate: '12/12/2020', email: 'load@test' };
    order.destinationInfo = { port: 'destination port', expectedDate: '12/12/2020', email: 'unload@test' };

    component.setValue(order);

    const orderOutput = component.getValue();

    expect(orderOutput).toEqual(order);
  });

  it('should autocomplete form group if name match', () => {
    const existingCustomers = [
      buildPerson('another customer', 'other@test'),
      buildPerson('customer name', 'customer@test')
    ];
    const customer = existingCustomers[1];
    const formGroup = component.fillPersonForm(buildPerson(customer.name));

    component.autocompleteByName(formGroup, existingCustomers);

    expect(formGroup.value).toEqual(customer);
  });

  it('should not autocomplete if the name is not set', () => {
    const existingCustomers = [
      buildPerson('another customer', 'other@test'),
      buildPerson('', 'customer@test')
    ];
    const formGroup = component.fillPersonForm(buildPerson('', 'email@test'));

    component.autocompleteByName(formGroup, existingCustomers);

    expect(formGroup.value.email).toEqual('email@test');
  });

});
