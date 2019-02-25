import { AbstractControl } from '@angular/forms';
import { isQuantity } from './is-quantity';

export class FluValidators {

  static quantity = (control: AbstractControl) => {
    return !control.value || isQuantity(control.value) ? null : { 'invalidQuantity': control.value }
  };
}
