import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DatePickerDirective } from './date-picker/date-picker.directive';
import { DatetimePickerDirective } from './date-picker/datetime-picker.directive';
import { LoadingComponent } from './loading/loading.component';
import { TimePickerDirective } from './date-picker/time-picker.directive';
import { WhenEnterPressedDirective } from './when-enter-pressed.directive';
import { ErrorComponent } from './error.component';
import { SuccessComponent } from './success.component';
import { FormFieldComponent } from './form-field.component';
import { HeroContainerComponent } from './hero-container.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DatePickerDirective,
    DatetimePickerDirective,
    TimePickerDirective,
    WhenEnterPressedDirective,
    LoadingComponent,
    ErrorComponent,
    SuccessComponent,
    FormFieldComponent,
    HeroContainerComponent
  ],
  exports: [
    DatePickerDirective,
    DatetimePickerDirective,
    TimePickerDirective,
    WhenEnterPressedDirective,
    LoadingComponent,
    ErrorComponent,
    SuccessComponent,
    FormFieldComponent,
    HeroContainerComponent,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {
}
