import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {

  result: ResultHelper = new ResultHelper();

  showMsgRedirect: boolean;
  redirectUrl: string;

  userCredentials: UserCredentials = new UserCredentials();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.showMsgRedirect = !!this.route.snapshot.queryParams['redirectTo'];
    this.redirectUrl = this.route.snapshot.queryParams['redirectTo'] || '/mes-lettres-de-voiture';
  }

  login() {
    this.result.waiting();

    this.authService.login(this.userCredentials).pipe(
      catchError((errorResponse) => {
        return throwError(errorResponse.error);
      }))
      .subscribe(() => {
        this.result.success();

        this.router.navigateByUrl(this.redirectUrl)

      }, error => this.result.error(error));
  }

}
