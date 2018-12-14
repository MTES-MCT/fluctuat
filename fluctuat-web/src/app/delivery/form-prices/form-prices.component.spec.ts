import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPricesComponent } from './form-prices.component';

describe('FormPricesComponent', () => {
  let component: FormPricesComponent;
  let fixture: ComponentFixture<FormPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
