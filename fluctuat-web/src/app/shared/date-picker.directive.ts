import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import flatpickr from 'flatpickr';
import { French } from 'flatpickr/dist/l10n/fr';

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
      dateFormat: 'd/m/Y',
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
