import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <flu-header></flu-header>
    <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {

  ngOnInit() {
    registerLocaleData(localeFr);
  }
}
