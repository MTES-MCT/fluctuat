import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import { Component } from '@angular/core';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear error', () => {
    component.errorMsg = 'test';
    component.clearError();

    expect(component.errorMsg).toBeUndefined();
  });
});

@Component({
  template: '<flu-error closable errorMsg="test"></flu-error>'
})
class ErrorClosableHostComponent {
}

describe('ErrorComponent closable', () => {
  let component: ErrorClosableHostComponent;
  let fixture: ComponentFixture<ErrorClosableHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ErrorClosableHostComponent,
        ErrorComponent
      ]
    });

    fixture = TestBed.createComponent(ErrorClosableHostComponent);
    component = fixture.componentInstance;
  }));

  it('should show a close button', () => {
    fixture.detectChanges();
    const closeButton = fixture.nativeElement.querySelector('button');

    expect(closeButton).toBeTruthy();
  });

});

@Component({
  template: '<flu-error errorMsg="test"></flu-error>'
})
class ErrorNotClosableHostComponent {
}

describe('ErrorComponent closable', () => {
  let component: ErrorNotClosableHostComponent;
  let fixture: ComponentFixture<ErrorNotClosableHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ErrorNotClosableHostComponent,
        ErrorComponent
      ]
    });

    fixture = TestBed.createComponent(ErrorNotClosableHostComponent);
    component = fixture.componentInstance;
  }));

  it('should not show a close button', () => {
    fixture.detectChanges();
    const closeButton = fixture.nativeElement.querySelector('button');

    expect(closeButton).toBeNull();
  });
});
