import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContractService } from './form-new-delivery/contract.service';
import { DeliveryService } from './form-new-delivery/delivery.service';
import { FormNewDeliveryComponent } from './form-new-delivery/form-new-delivery.component';
import { FormTransporterComponent } from './form-transporter/form-transporter.component';
import { TransporterService } from './form-transporter/transporter.service';
import { HeaderComponent } from './header/header.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormTransporterComponent,
    FormNewDeliveryComponent,
    SummaryComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    DeliveryService,
    TransporterService,
    ContractService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
