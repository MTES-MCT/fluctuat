import { Component, OnInit } from '@angular/core';
import { UserCredentials } from '../shared/model/user-credentials.model';
import { AuthService } from '../providers/auth/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'flu-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {

  errorMsg: string;
  waitingFor: boolean;

  userCredentials: UserCredentials = new UserCredentials();

  constructor(private authService: AuthService, private router: Router,) {
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
