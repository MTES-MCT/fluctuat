import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCredentials } from '../../shared/model/user-credentials.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

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

}
