import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewTransporter } from './form-new-transporter.component';

describe('FormNewTransporterComponent', () => {
  let component: FormNewTransporter;
  let fixture: ComponentFixture<FormNewTransporter>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewTransporter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewTransporter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
