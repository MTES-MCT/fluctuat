import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import flatpickr from 'flatpickr';
import { French } from 'flatpickr/dist/l10n/fr';

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
      dateFormat: 'd/m/Y, H:i',
      time_24hr: true,
      disableMobile: true
    });
  }

  @Input()
  set date(date: string) {
    this.fp.setDate(date, false)
  };

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
