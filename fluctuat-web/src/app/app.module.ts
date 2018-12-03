import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeliveryService } from './form-new-delivery/delivery.service';
import { FormNewDeliveryComponent } from './form-new-delivery/form-new-delivery.component';
import { FormTransporterComponent } from './form-transporter/form-transporter.component';
import { TransporterService } from './form-transporter/transporter.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormTransporterComponent,
    FormNewDeliveryComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule
  ],
  providers: [
    DeliveryService,
    TransporterService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
