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
    const logged = !!localStorage.getItem('loggedIn');
    this.isAuthenticated$.next(logged); // init value from storage
  }

  signUp(account: UserAccount) {
    return this.http.post('/api/auth/sign-up', account)
  }

  login(userCredentials: UserCredentials) {
    return this.http.post('/api/auth/login', userCredentials)
      .pipe(tap((userData) => this.userLoggedIn(userData)))
  }

  private userLoggedIn = (user) => {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(user));
    this.isAuthenticated$.next(true);
  };

  getUser = (): UserAccount => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;

  logout() {
    return this.http.post('/api/auth/logout', null)
      .pipe(tap(() => this.userLoggedOut()))
  }

  removeUser = () => localStorage.removeItem('user');

  userLoggedOut() {
    localStorage.removeItem('loggedIn');
    this.isAuthenticated$.next(false);
  }

  /** @return if the user are authenticated */
  isAuthenticated(): boolean {
    return this.isAuthenticated$.value;
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
