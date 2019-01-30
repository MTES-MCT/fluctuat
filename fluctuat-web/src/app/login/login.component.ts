import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { UserCredentials } from '../core/auth/user-credentials.model';
import { AuthService } from '../core/auth/auth.service';
import { ResultHelper } from '../core/result-helper';

@Component({
  selector: 'flu-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  result: ResultHelper = new ResultHelper();

  showMsgRedirect: boolean;

  userCredentials: UserCredentials = new UserCredentials();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.showMsgRedirect = this.route.snapshot.queryParams['redirectTo'];
  }

  login() {
    this.result.waiting();

    this.authService.login(this.userCredentials).pipe(
      catchError((errorResponse) => {
        return throwError(errorResponse.error);
      }))
      .subscribe(() => {
        this.result.success();
        const paramRedirect = this.route.snapshot.queryParams['redirectTo'];

        const redirectUrl = paramRedirect ? paramRedirect : '/mes-lettres-de-voiture';

        this.router.navigateByUrl(redirectUrl)

      }, error => this.result.error(error));
  }

}
