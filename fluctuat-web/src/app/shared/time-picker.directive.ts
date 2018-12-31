import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import flatpickr from 'flatpickr';

@Directive({
  selector: '[fluTimePicker]'
})
export class TimePickerDirective implements OnDestroy {

  fp: any;

  @Output()
  dateChange = new EventEmitter();

  constructor(el: ElementRef) {

    this.fp = flatpickr(el.nativeElement, {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      time_24hr: true,
    });
  }

  @Input()
  set date(value: string) {
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

  ngOnDestroy() {
    this.fp.destroy();
  }
}
