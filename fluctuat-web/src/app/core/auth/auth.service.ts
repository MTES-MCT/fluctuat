import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserCredentials } from './user-credentials.model';
import { UserAccount } from './user-account.model';

@Injectable()
export class AuthService {

  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    this.isAuthenticated(); // init value
  }

  signUp(account: UserAccount) {
    return this.http.post('/api/auth/sign-up', account)
  }

  login(userCredentials: UserCredentials) {
    return this.http.post('/api/auth/login', userCredentials)
      .pipe(tap(this.saveUser))
  }

  saveUser = (result: { user: UserAccount }) => sessionStorage.setItem('user', JSON.stringify(result.user));

  getUser = () => sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : undefined;

  logout() {
    this.removeUser();
    this.isAuthenticated(); // ensure refresh subject value
    return this.http.post('/api/auth/logout', null)
  }

  private removeUser = () => sessionStorage.removeItem('user');

  /** @return if the user are authenticated and emit a new value if changes */
  // TODO consider consume only authenticated observable
  isAuthenticated(): boolean {

    const hasUser = !!sessionStorage.getItem('user');
    if (this.isAuthenticated$.value !== hasUser) {
      this.isAuthenticated$.next(hasUser);
    }
    return hasUser
  };

  /** Subscribe to be notified when authentication value changes (login and logout) */
  authenticated = (): Observable<boolean> => this.isAuthenticated$.asObservable();

  changePassword(newPassword: string, token: string) {
    return this.http.post('/api/auth/change-password', { newPassword, token })
  }

  recoverPassword(email: string) {
    return this.http.post('/api/auth/recover-password', { email })
  }

}
