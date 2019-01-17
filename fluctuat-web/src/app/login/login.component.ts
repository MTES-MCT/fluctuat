import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { UserCredentials } from '../providers/auth/user-credentials.model';
import { AuthService } from '../providers/auth/auth.service';

@Component({
  selector: 'flu-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  errorMsg: string;
  waitingFor: boolean;
  showMsgRedirect: boolean;

  userCredentials: UserCredentials = new UserCredentials();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.showMsgRedirect = this.route.snapshot.queryParams['redirectTo'];
  }

  login() {

    this.authService.login(this.userCredentials).pipe(
      tap(() => this.waitingFor = false),
      catchError((errorResponse) => {
        this.waitingFor = false;
        return throwError(errorResponse.error);
      }))
      .subscribe(() => {
        const paramRedirect = this.route.snapshot.queryParams['redirectTo'];

        const redirectUrl = paramRedirect ? paramRedirect : '/transporteur';

        this.router.navigateByUrl(redirectUrl)

      }, error => this.errorMsg = error);
  }

}
