import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { UserCredentials } from '../providers/auth/user-credentials.model';
import { AuthService } from '../providers/auth/auth.service';

@Component({
  selector: 'flu-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {

  errorMsg: string;
  waitingFor: boolean;

  userCredentials: UserCredentials = new UserCredentials();

  constructor(private authService: AuthService, private router: Router) {
  }

  signUp() {
    if (this.waitingFor) {
      return;
    }
    this.errorMsg = undefined;
    this.waitingFor = true;

    this.authService.signUp(this.userCredentials).pipe(
      tap(() => this.waitingFor = false),
      catchError((errorResponse) => {
        this.waitingFor = false;
        return throwError(errorResponse.error);
      }))
      .subscribe(() => {
        this.router.navigateByUrl('/transporteur')
      }, error => this.errorMsg = error);

  }
}
