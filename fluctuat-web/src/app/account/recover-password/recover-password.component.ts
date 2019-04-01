import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ResultHelper } from '../../core/result-helper';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'flu-recover-password',
  templateUrl: './recover-password.component.html'
})
export class RecoverPasswordComponent implements OnInit {

  result: ResultHelper = new ResultHelper();
  successMsg: string;

  recoverPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit() {
    this.recoverPasswordForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    })
  }

  recoverPassword() {
    this.result.waiting();

    this.authService.recoverPassword(this.recoverPasswordForm.value.email)
      .pipe(catchError((errorResponse) => throwError(errorResponse.error)))
      .subscribe(() => {
        this.result.success();
        this.successMsg = 'Vous allez recevoir un email contenant les instructions pour réinitialiser votre mot de passe.';
      }, error => this.result.error(error));
  }

  showError(control: AbstractControl) {
    return control && control.invalid && (control.dirty || control.touched)
  }

}
