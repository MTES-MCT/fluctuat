import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'flu-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  authenticated$: Observable<boolean>;

  active = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authenticated$ = this.authService.authenticated();
    this.router.events.subscribe((event) => {
      // close menu if navigation changes
      if (event instanceof NavigationEnd) {
        this.active = false;
      }
    });
  }

  logout() {
    this.authService.logout()
      .subscribe(() => this.router.navigate(['']));
  }

  toggleMenu() {
    this.active = !this.active;
  }

}
