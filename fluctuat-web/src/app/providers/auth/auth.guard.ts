import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuthentication(state.url);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(next, state);
  }


  checkAuthentication(url: string): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate([ 'connexion' ], { queryParams: { redirectTo: url } }); // TODO replace by navigateUrl ?
    console.info('Redirect because not logged');
    return false;
  }
}
