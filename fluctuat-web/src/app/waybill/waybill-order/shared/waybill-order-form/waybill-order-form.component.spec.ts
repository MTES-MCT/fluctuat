import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WaybillOrderFormComponent } from './waybill-order-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../../shared/form-field.component';
import { DatetimePickerDirective } from '../../../../shared/datetime-picker.directive';
import { Person } from '../../../../../../../fluctuat-api/src/models/person';
import { OrderInfo } from '../../../shared/models/order-info.model';
import { DatePickerDirective } from '../../../../shared/date-picker.directive';

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
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaybillOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map correctly between waybill order and form', () => {

    const order = new OrderInfo();
    order.customer = buildPerson('customer name', 'customer@test');
    order.sender = buildPerson('sender name', 'sender@test');
    order.receiver = buildPerson('receiver name', 'receiver@test');
    order.middleman = { name: 'a broker', email: 'broker@test', isBroker: true, cellphone: null };
    order.transporter = buildPerson('transporter name', 'trasporter@test', '123456');
    order.ship = { name: 'shipname', regNumber: 'FR 123' };
    order.merchandise = { nature: 'ble', price: '2', weight: '42' };
    order.originInfo = { port: 'origin port', expectedDate: '12/12/2020', email: 'load@test' };
    order.destinationInfo = { port: 'destination port', expectedDate: '12/12/2020', email: 'unload@test' }

    component.setValue(order);

    let orderOutput = component.getValue();

    expect(orderOutput).toEqual(order)
  });
});

const buildPerson = (name, email, cellphone = null) => {
  let person = new Person();
  person.name = name;
  person.email = email;
  person.cellphone = cellphone;
  return person;
};
