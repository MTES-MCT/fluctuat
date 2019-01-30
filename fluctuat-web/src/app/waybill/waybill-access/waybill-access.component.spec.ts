import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaybillAccessComponent } from './waybill-access.component';

describe('WaybillAccessComponent', () => {
  let component: WaybillAccessComponent;
  let fixture: ComponentFixture<WaybillAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaybillAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaybillAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
