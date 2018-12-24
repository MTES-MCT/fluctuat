import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLoadDelayComponent } from './form-load-delay.component';

describe('FormLoadDelayComponent', () => {
  let component: FormLoadDelayComponent;
  let fixture: ComponentFixture<FormLoadDelayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLoadDelayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoadDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
