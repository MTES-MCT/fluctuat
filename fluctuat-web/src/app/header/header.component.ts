import { Component } from '@angular/core';
import { AuthService } from '../providers/auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'flu-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  authenticated$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.authenticated$ = authService.authenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate([ '' ])
  }
}
