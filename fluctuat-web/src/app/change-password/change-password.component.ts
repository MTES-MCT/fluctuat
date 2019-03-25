import { Component, OnInit } from '@angular/core';
import { ResultHelper } from '../core/result-helper';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FluValidators } from '../core/form-validators/flu-validators';

@Component({
  selector: 'flu-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  token: string;

  result: ResultHelper = new ResultHelper();
  successMsg;

  constructor(private route: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: [FluValidators.passwordMismatch] })
    this.token = this.route.snapshot.queryParams['token'];
  }

  changePassword() {
    this.result.waiting();

    this.authService.changePassword(this.changePasswordForm.value.password, this.token)
      .pipe(catchError((errorResponse) => throwError(errorResponse.error)))
      .subscribe(() => {
        this.result.success();
        this.successMsg = 'Le nouveau mot de passe a bien été enregistré.';
      }, error => this.result.error(error));
  }


  showError(control: AbstractControl) {
    return control && control.invalid && (control.dirty || control.touched)
  }
}
