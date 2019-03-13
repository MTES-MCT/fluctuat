import { Waybill } from '../models/waybill.model';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WaybillOptionsComponent } from './waybill-options.component';
import { LoadInfo } from '../models/load-info.model';

@Component({
  template: '<flu-waybill-options [waybill]=waybill></flu-waybill-options>'
})
class WayBillOptionsHostComponent {
  waybill: Waybill
}

describe('WaybillOptions component tests', () => {

  let component: WayBillOptionsHostComponent;
  let fixture: ComponentFixture<WayBillOptionsHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        WayBillOptionsHostComponent,
        WaybillOptionsComponent,
      ],
      imports: [RouterTestingModule]
    });

    fixture = TestBed.createComponent(WayBillOptionsHostComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be show download button waybill has documentUrl', () => {
    const waybill = createWaybill();
    waybill.documentUrl = 'http://test/document.pdf';
    component.waybill = waybill;
    fixture.detectChanges();

    const elemText = fixture.nativeElement.querySelectorAll('span')[1];

    expect(elemText.innerHTML.trim()).toBe('Télécharger au format pdf');

    const elem = fixture.nativeElement.querySelector('a');
    expect(elem.href).toBe(waybill.documentUrl)
  })

});

const createWaybill = () => {
  const waybill = new Waybill();
  waybill.loadInfo = new LoadInfo();
  waybill.unloadInfo = new LoadInfo();
  return waybill;
};
