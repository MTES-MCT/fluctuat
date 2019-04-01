import { AbstractControl } from '@angular/forms';
import { isQuantity } from './is-quantity';
import { isFrenchCellphone } from './is-french-cellphone';
import { hasDomain } from './has-domain';

export class FluValidators {

  static quantity = (control: AbstractControl) =>
    !control.value || isQuantity(control.value) ? null : { 'quantity': true }

  static frenchPhone = (control: AbstractControl) =>
    !control.value || isFrenchCellphone(control.value) ? null : { 'frenchPhone': true }

  static passwordMismatch = (control: AbstractControl) =>
    control.get('password').value === control.get('confirmPassword').value ? null : { 'passwordMismatch': true }

  static withDomain = (control: AbstractControl) =>
    !control.value || hasDomain(control.value) ? null : { 'withDomain': true }
}
