import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaybillUnloadComponent } from './waybill-unload.component';

describe('WaybillUnloadComponent', () => {
  let component: WaybillUnloadComponent;
  let fixture: ComponentFixture<WaybillUnloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaybillUnloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaybillUnloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
