import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCredentials } from '../../shared/model/user-credentials.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
  }

  signUp(userCredentials: UserCredentials) {
    return this.http.post('/api/auth/sign-up', userCredentials)
      .pipe(tap(this.saveToken))
  }

  login(userCredentials: UserCredentials) {
    return this.http.post('/api/auth/login', userCredentials)
      .pipe(tap(this.saveToken))
  }

  saveToken = (result: { token: string }) => sessionStorage.setItem('access_token', result.token);

  getToken = () => sessionStorage.getItem('access_token');

  logout() {
    this.removeToken();
    this.isAuthenticated(); // ensure refresh subject value
  }

  private removeToken = () => sessionStorage.removeItem('access_token');

  /** @return if the user are authenticated and emit a new value if changes */
  // TODO consider consume only authenticated observable
  isAuthenticated(): boolean {

    const hasToken = !!sessionStorage.getItem('access_token');
    if (this.isAuthenticated$.value !== hasToken) {
      this.isAuthenticated$.next(hasToken);
    }
    return hasToken
  };

  /** Subscribe to be notified when authentication value changes (login and logout) */
  authenticated = (): Observable<boolean> => this.isAuthenticated$.asObservable();

}
