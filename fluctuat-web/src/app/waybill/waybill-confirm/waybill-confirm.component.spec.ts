import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaybillConfirmComponent } from './waybill-confirm.component';

describe('WaybillConfirmComponent', () => {
  let component: WaybillConfirmComponent;
  let fixture: ComponentFixture<WaybillConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaybillConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaybillConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
