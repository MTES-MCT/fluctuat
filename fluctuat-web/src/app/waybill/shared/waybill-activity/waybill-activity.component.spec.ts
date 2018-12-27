import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaybillActivityComponent } from './waybill-activity.component';

describe('WaybillActivityComponent', () => {
  let component: WaybillActivityComponent;
  let fixture: ComponentFixture<WaybillActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaybillActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaybillActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
