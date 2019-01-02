import { NgForm } from '@angular/forms';

export abstract class AbstractForm {

  submitted: boolean;

  abstract form: NgForm;

  /** action called on submit() */
  abstract nextStep: () => any;

  hasError(formValue) {
    return formValue.invalid && (this.submitted || formValue.dirty || formValue.touched)
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.nextStep();
  }
}
