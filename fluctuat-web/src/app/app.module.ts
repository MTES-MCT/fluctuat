import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormTransporter } from './form-transporter/form-transporter.component';
import { TransporterService } from './form-transporter/transporter.service';
import { FromNewPathComponent } from './from-new-path/from-new-path.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormTransporter,
    FromNewPathComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule
  ],
  providers: [
    TransporterService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
