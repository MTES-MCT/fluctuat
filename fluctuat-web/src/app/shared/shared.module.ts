import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DatePickerDirective } from './date-picker.directive';
import { LoadingComponent } from './loading/loading.component';
import { TimePickerDirective } from './time-picker.directive';
import { WhenEnterPressedDirective } from './when-enter-pressed.directive';
import { ErrorComponent } from './error.component';

@NgModule({
  declarations: [
    DatePickerDirective,
    TimePickerDirective,
    WhenEnterPressedDirective,
    LoadingComponent,
    ErrorComponent
  ],
  exports: [
    DatePickerDirective,
    TimePickerDirective,
    WhenEnterPressedDirective,
    LoadingComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
