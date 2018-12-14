import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormMerchandiseComponent } from './form-merchandise.component';


describe('FormMerchandiseComponent', () => {
  let component: FormMerchandiseComponent;
  let fixture: ComponentFixture<FormMerchandiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMerchandiseComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMerchandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
