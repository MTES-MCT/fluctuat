import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormNewTransporter } from './form-new-transporter/form-new-transporter.component';
import { FromNewPathComponent } from './from-new-path/from-new-path.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormNewTransporter,
    FromNewPathComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
