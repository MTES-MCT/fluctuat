import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromNewPathComponent } from './from-new-path.component';

describe('FromNewPathComponent', () => {
  let component: FromNewPathComponent;
  let fixture: ComponentFixture<FromNewPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromNewPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromNewPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
