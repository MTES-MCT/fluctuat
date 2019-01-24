import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DatePickerDirective } from './date-picker.directive';
import { DatetimePickerDirective } from './datetime-picker.directive';
import { LoadingComponent } from './loading/loading.component';
import { TimePickerDirective } from './time-picker.directive';
import { WhenEnterPressedDirective } from './when-enter-pressed.directive';
import { ErrorComponent } from './error.component';
import { SuccessComponent } from './success.component';
import { FormFieldComponent } from './form-field.component';

@NgModule({
  declarations: [
    DatePickerDirective,
    DatetimePickerDirective,
    TimePickerDirective,
    WhenEnterPressedDirective,
    LoadingComponent,
    ErrorComponent,
    SuccessComponent,
    FormFieldComponent
  ],
  exports: [
    DatePickerDirective,
    DatetimePickerDirective,
    TimePickerDirective,
    WhenEnterPressedDirective,
    LoadingComponent,
    ErrorComponent,
    SuccessComponent,
    FormFieldComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
