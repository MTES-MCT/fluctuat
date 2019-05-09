import { WaybillLoadInfoComponent } from './waybill-load-info.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { Waybill } from '../models/waybill.model';
import { getElemByTestId } from '../../../../test.utils';

describe('WaybillLoadInfo component tests', () => {

  let fixture: ComponentFixture<WaybillLoadInfoComponent>;
  let component: WaybillLoadInfoComponent;
  let getByTestId;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaybillLoadInfoComponent],
      providers: [
        DatePipe
      ]
    });

    fixture = TestBed.createComponent(WaybillLoadInfoComponent);
    component = fixture.componentInstance;
    getByTestId = getElemByTestId(fixture.nativeElement);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should format date', () => {
    const waybill = new Waybill();
    waybill.loadInfo.startDate = new Date('2020-12-02T09:00');
    component.waybill = waybill;
    fixture.detectChanges();

    const elemTxt = getByTestId('startDate').innerHTML.trim();

    expect(elemTxt).toBe('02/12/2020, 09:00');
  });

});
