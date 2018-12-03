import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewDeliveryComponent } from './form-new-delivery.component';

describe('FormNewDeliveryComponent', () => {
  let component: FormNewDeliveryComponent;
  let fixture: ComponentFixture<FormNewDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewDeliveryComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
