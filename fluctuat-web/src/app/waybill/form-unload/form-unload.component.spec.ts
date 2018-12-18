import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUnloadComponent } from './form-unload.component';

describe('FormUnloadComponent', () => {
  let component: FormUnloadComponent;
  let fixture: ComponentFixture<FormUnloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUnloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUnloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
