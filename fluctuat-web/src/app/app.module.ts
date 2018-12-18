import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeliveryService } from './delivery//delivery.service';
import { ContractService } from './delivery/contract.service';
import { ContractComponent } from './delivery/contract/contract.component';
import { DashboardComponent } from './delivery/dashboard/dashboard.component';
import { DeliveryDetailComponent } from './delivery/delivery-detail/delivery-detail.component';
import { FormCustomerComponent } from './delivery/form-customer/form-customer.component';
import { FormLoadDelayComponent } from './delivery/form-load-delay/form-load-delay.component';
import { FormMerchandiseComponent } from './delivery/form-merchandise/form-merchandise.component';
import { FormPathComponent } from './delivery/form-path/form-path.component';
import { FormPricesComponent } from './delivery/form-prices/form-prices.component';
import { SummaryComponent } from './delivery/summary/summary.component';
import { FormNewDeliveryComponent } from './form-new-delivery/form-new-delivery.component';
import { FormTransporterComponent } from './form-transporter/form-transporter.component';
import { ShipService } from './form-transporter/ship.service';
import { TransporterService } from './form-transporter/transporter.service';
import { HeaderComponent } from './header/header.component';
import { DatePickerDirective } from './shared/date-picker.directive';
import { HeroContainerComponent } from './shared/hero-container/hero-container.component';
import { TimePickerDirective } from './shared/time-picker.directive';
import { WhenEnterPressedDirective } from './shared/when-enter-pressed.directive';
import { FormLoadingComponent } from './waybill/form-loading/form-loading.component';
import { LoadInfoService } from './waybill/form-loading/load-info.service';
import { FormShipComponent } from './waybill/form-ship/form-ship.component';
import { FormUnloadComponent } from './waybill/form-unload/form-unload.component';
import { UnloadInfoService } from './waybill/form-unload/unload-info.service';
import { WaybillConfirmComponent } from './waybill/waybill-confirm/waybill-confirm.component';
import { WaybillLoadComponent } from './waybill/waybill-load/waybill-load.component';
import { WaybillUnloadComponent } from './waybill/waybill-unload/waybill-unload.component';
import { WaybillComponent } from './waybill/waybill/waybill.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormTransporterComponent,
    // FormNewDeliveryComponent, //TODO remove when implemented away
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
    DashboardComponent,
    DeliveryDetailComponent,
    ContractComponent,
    FormLoadingComponent,
    FormShipComponent,
    WaybillLoadComponent,
    WaybillComponent,
    WaybillConfirmComponent,
    FormUnloadComponent,
    WaybillUnloadComponent,
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
    ShipService,
    LoadInfoService,
    UnloadInfoService,
    ContractService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
