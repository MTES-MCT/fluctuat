import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryActivityComponent } from './delivery-activity.component';

describe('DeliveryActivityComponent', () => {
  let component: DeliveryActivityComponent;
  let fixture: ComponentFixture<DeliveryActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
