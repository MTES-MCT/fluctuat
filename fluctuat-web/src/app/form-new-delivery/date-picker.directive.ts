import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import flatpickr from 'flatpickr';
import { French } from 'flatpickr/dist/l10n/fr';

@Directive({
  selector: '[fluDatePicker]'
})
export class DatePickerDirective {

  fp: any;

  @Output()
  dateChange = new EventEmitter();

  constructor(el: ElementRef) {

    this.fp = flatpickr(el.nativeElement, {
      locale: French,
      enableTime: true,
      altInput: true,
      altFormat: 'd/m/Y, H:i',
      dateFormat: 'Y-m-dTH:i',
      time_24hr: true,
    });
  }

  @Input()
  set date(value: Date) {
    this.fp.setDate(value, false)
  };

  @HostListener('click')
  open() {
    this.fp.open();
  }

  @HostListener('change', [ '$event.target.value' ])
  change(value) {
    this.dateChange.emit(value);
  }

}
