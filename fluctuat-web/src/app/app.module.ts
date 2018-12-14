import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormCustomerComponent } from './delivery/form-customer/form-customer.component';
import { FormLoadDelayComponent } from './delivery/form-load-delay/form-load-delay.component';
import { FormMerchandiseComponent } from './delivery/form-merchandise/form-merchandise.component';
import { FormPathComponent } from './delivery/form-path/form-path.component';
import { FormPricesComponent } from './delivery/form-prices/form-prices.component';
import { ContractService } from './form-new-delivery/contract.service';
import { DeliveryService } from './delivery//delivery.service';
import { FormNewDeliveryComponent } from './form-new-delivery/form-new-delivery.component';
import { FormTransporterComponent } from './form-transporter/form-transporter.component';
import { TransporterService } from './form-transporter/transporter.service';
import { HeaderComponent } from './header/header.component';
import { DatePickerDirective } from './shared/date-picker.directive';
import { TimePickerDirective } from './shared/time-picker.directive';
import { HeroContainerComponent } from './shared/hero-container/hero-container.component';
import { WhenEnterPressedDirective } from './shared/when-enter-pressed.directive';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormTransporterComponent,
    FormNewDeliveryComponent,
    SummaryComponent,
    TimePickerDirective,
    DatePickerDirective,
    WhenEnterPressedDirective,
    HeroContainerComponent,
    FormCustomerComponent,
    FormLoadDelayComponent,
    FormMerchandiseComponent,
    FormPathComponent,
    FormPricesComponent,
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
