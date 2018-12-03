import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { FormTransporterComponent } from './form-transporter.component';
import { TransporterService } from './transporter.service';

describe('FormTransporterComponent', () => {
  let component: FormTransporterComponent;
  let fixture: ComponentFixture<FormTransporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTransporterComponent ],
      imports: [ FormsModule ],
      providers: [ TransporterService ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTransporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
