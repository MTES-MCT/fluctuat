import { AbstractControl } from '@angular/forms';
import { isQuantity } from './is-quantity';
import { isFrenchCellphone } from './is-french-cellphone';

export class FluValidators {

  static quantity = (control: AbstractControl) => {
    return !control.value || isQuantity(control.value) ? null : { 'invalidQuantity': control.value }
  };

  static frenchPhone = (control: AbstractControl) => {
    return !control.value || isFrenchCellphone(control.value) ? null : { 'invalidPhone': control.value }
  }
}
