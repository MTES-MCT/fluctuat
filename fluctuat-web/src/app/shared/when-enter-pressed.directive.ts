import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[fluWhenEnterPressed]'
})
export class WhenEnterPressedDirective {

  @Input('fluWhenEnterPressed')
  action: any;

  @HostListener('keypress', ['$event.keyCode'])
  doAction(keyCode) {
    if (!this.action || keyCode !== 13) {
      return;
    }

    this.action();
  }

}
