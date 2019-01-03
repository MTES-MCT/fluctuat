import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPathComponent } from './form-path.component';

describe('FormPathComponent', () => {
  let component: FormPathComponent;
  let fixture: ComponentFixture<FormPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
