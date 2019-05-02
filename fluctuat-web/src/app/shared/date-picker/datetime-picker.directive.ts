import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import flatpickr from 'flatpickr';
import { French } from 'flatpickr/dist/l10n/fr';
import { DatePickerConfig } from './date-picker.config';

@Directive({
  selector: '[fluDatetimePicker]'
})
export class DatetimePickerDirective implements OnDestroy {

  fp: any;

  @Output()
  dateChange = new EventEmitter();

  constructor(el: ElementRef) {

    this.fp = flatpickr(el.nativeElement, {
      locale: French,
      enableTime: true,
      dateFormat: 'Z',
      altFormat: DatePickerConfig.dateTimeFormat,
      altInput: true,
      time_24hr: true
    });
  }

  @Input()
  set date(date: string) {
    this.fp.setDate(date, false);
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
