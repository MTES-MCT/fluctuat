import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserCredentials } from '../core/auth/user-credentials.model';
import { AuthService } from '../core/auth/auth.service';
import { ResultHelper } from '../core/result-helper';

@Component({
  selector: 'flu-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {

  result: ResultHelper = new ResultHelper();

  userCredentials: UserCredentials = new UserCredentials();

  constructor(private authService: AuthService, private router: Router) {
  }

  signUp() {
    this.result.waiting();

    this.authService.signUp(this.userCredentials).pipe(
      catchError((errorResponse) => {
        return throwError(errorResponse.error);
      }))
      .subscribe(() => {
        this.result.success();
        this.router.navigateByUrl('/mes-lettres-de-voiture')
      }, error => this.result.error(error));

  }
}
