import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCredentials } from '../shared/model/user-credentials.model';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signUp(userCredentials: UserCredentials) {
    return this.http.post('/api/auth/sign-up', userCredentials)
  }

  login(userCredentials: UserCredentials) {
    return this.http.post('/api/auth/login', userCredentials)
  }
}
