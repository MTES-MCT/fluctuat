import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DatePickerDirective } from './date-picker.directive';
import { LoadingComponent } from './loading/loading.component';
import { TimePickerDirective } from './time-picker.directive';
import { WhenEnterPressedDirective } from './when-enter-pressed.directive';

@NgModule({
  declarations: [
    DatePickerDirective,
    TimePickerDirective,
    WhenEnterPressedDirective,
    LoadingComponent
  ],
  exports: [
    DatePickerDirective,
    TimePickerDirective,
    WhenEnterPressedDirective,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
