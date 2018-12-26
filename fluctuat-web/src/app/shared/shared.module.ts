import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatePickerDirective } from './date-picker.directive';
import { TimePickerDirective } from './time-picker.directive';
import { WhenEnterPressedDirective } from './when-enter-pressed.directive';

@NgModule({
  declarations: [
    DatePickerDirective,
    TimePickerDirective,
    WhenEnterPressedDirective
  ],
  exports: [
    DatePickerDirective,
    TimePickerDirective,
    WhenEnterPressedDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
