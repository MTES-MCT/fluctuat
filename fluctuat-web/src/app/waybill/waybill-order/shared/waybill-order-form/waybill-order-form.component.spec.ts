import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WaybillOrderFormComponent } from './waybill-order-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../../shared/form-field.component';
import { DatetimePickerDirective } from '../../../../shared/datetime-picker.directive';
import { Waybill } from '../../../shared/models/waybill.model';
import { Person } from '../../../../../../../fluctuat-api/src/models/person';

describe('WaybillOrderFormComponent', () => {
  let component: WaybillOrderFormComponent;
  let fixture: ComponentFixture<WaybillOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WaybillOrderFormComponent,
        FormFieldComponent,
        DatetimePickerDirective
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

  it('should map correctly between waybill and form', () => {

    let waybillInput = new Waybill();

    let order = waybillInput.order;
    order.customer = buildPerson('customer name', 'customer@test');
    order.sender = buildPerson('sender name', 'sender@test');
    order.receiver = buildPerson('receiver name', 'receiver@test');
    order.transporter = buildPerson('transporter name', 'trasporter@test', '123456');
    order.ship = { name: 'shipname', regNumber: 'FR 123' };

    let loadInfo = waybillInput.loadInfo;
    loadInfo.loadManager.email = 'load@test';
    loadInfo.origin = 'origin port';
    loadInfo.destination = 'destinantion port';
    loadInfo.arrivalDate = 'arrival date';
    loadInfo.merchandiseType = 'merchandise type';
    loadInfo.merchandisePrice = '12';

    waybillInput.unloadInfo.loadManager.email = 'unload@test';
    component.setValue(waybillInput);

    let waybillOutput = component.getValue();

    expect(waybillOutput).toEqual(waybillInput)
  });
});

const buildPerson = (name, email, cellphone = null) => {
  let person = new Person();
  person.name = name;
  person.email = email;
  person.cellphone = cellphone;
  return person;
};
