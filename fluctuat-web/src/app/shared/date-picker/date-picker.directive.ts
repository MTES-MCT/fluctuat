import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import flatpickr from 'flatpickr';
import { French } from 'flatpickr/dist/l10n/fr';
import { DatePickerConfig } from './date-picker.config';

@Directive({
  selector: '[fluDatePicker]'
})
export class DatePickerDirective implements OnDestroy {

  fp: any;

  @Output()
  dateChange = new EventEmitter();

  constructor(el: ElementRef) {

    this.fp = flatpickr(el.nativeElement, {
      locale: French,
      dateFormat: 'Z',
      altFormat: DatePickerConfig.dateFormat,
      altInput: true
    });
  }

  @Input()
  set date(value: string) {
    this.fp.setDate(value, false);
  }

  @HostListener('click')
  open() {
    this.fp.open();
  }

  @HostListener('change', ['$event.target.value'])
  change(value) {
    this.dateChange.emit(value);
  }

  ngOnDestroy() {
    this.fp.destroy();
  }

}
