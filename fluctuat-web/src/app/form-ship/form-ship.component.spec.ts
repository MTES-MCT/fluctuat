import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormShipComponent } from './form-ship.component';

describe('FormShipComponent', () => {
  let component: FormShipComponent;
  let fixture: ComponentFixture<FormShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
