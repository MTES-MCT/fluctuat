import { Component } from '@angular/core';
import { UserCredentials } from '../shared/model/user-credentials.model';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'flu-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  errorMsg: string;
  waitingFor: boolean;

  userCredentials: UserCredentials = new UserCredentials();

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {

    this.authService.login(this.userCredentials).pipe(
      tap(() => this.waitingFor = false),
      catchError((errorResponse) => {
        this.waitingFor = false;
        return throwError(errorResponse.error);
      }))
      .subscribe((result: any) => {
        sessionStorage.setItem('userToken', result.token);
        this.router.navigateByUrl('/transporteur')

      }, error => this.errorMsg = error);
  }

}
