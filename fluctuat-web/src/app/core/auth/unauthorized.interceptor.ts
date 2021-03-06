import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

/**
 * Handle unauthorized responses (401)
 */
@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // TODO notify user session expired
          this.authService.userLoggedOut(); // app logout
          this.router.navigateByUrl('/connexion');
        } else if (error.status === 403) {
          this.router.navigateByUrl('/mes-lettres-de-voiture');
        }

        throw error;
      }));
  }

}
