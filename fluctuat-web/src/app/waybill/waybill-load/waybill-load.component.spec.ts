import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaybillLoadComponent } from './waybill-load.component';

describe('WaybillLoadComponent', () => {
  let component: WaybillLoadComponent;
  let fixture: ComponentFixture<WaybillLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaybillLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaybillLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
