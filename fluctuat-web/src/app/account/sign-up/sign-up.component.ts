import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../../core/auth/auth.service';
import { ResultHelper } from '../../core/result-helper';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GENERIC_ERROR_MSG } from '../../core/generic-error';

@Component({
  selector: 'flu-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {

  result: ResultHelper = new ResultHelper();
  successMsg: string;

  accountForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required]
    })
  }


  signUp() {
    this.result.waiting();

    this.authService.signUp(this.accountForm.value).pipe(
      catchError((errorResponse) => {
        const errorMsg = errorResponse.code === 400 ? errorResponse.error: GENERIC_ERROR_MSG;
        return throwError(errorMsg);
      }))
      .subscribe(() => {
        this.result.success();
        this.successMsg = `Votre compte a bien été enregistré.
         Vous allez recevoir un email contenant les instructions pour son activation.`
      }, error => this.result.error(error));

  }

  showError(control: AbstractControl) {
    return control && control.invalid && (control.dirty || control.touched)
  }
}
