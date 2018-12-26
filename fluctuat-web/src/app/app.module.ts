///<reference path="../../node_modules/@angular/platform-browser/src/browser.d.ts"/>
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormCustomerComponent } from './contract-new/form-customer/form-customer.component';
import { FormLoadDelayComponent } from './contract-new/form-load-delay/form-load-delay.component';
import { FormMerchandiseComponent } from './contract-new/form-merchandise/form-merchandise.component';
import { FormPathComponent } from './contract-new/form-path/form-path.component';
import { FormPricesComponent } from './contract-new/form-prices/form-prices.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormLoadComponent } from './form-load/form-load.component';
import { FormShipComponent } from './form-ship/form-ship.component';
import { FormTransporterComponent } from './form-transporter/form-transporter.component';
import { FormUnloadComponent } from './form-unload/form-unload.component';
import { HeaderComponent } from './header/header.component';
import { ContractService } from './providers/contract.service';
import { DeliveryService } from './providers/delivery.service';
import { LoadInfoService } from './providers/load-info.service';
import { ShipService } from './providers/ship.service';
import { TransporterService } from './providers/transporter.service';
import { UnloadInfoService } from './providers/unload-info.service';
import { HeroContainerComponent } from './shared/hero-container/hero-container.component';
import { SharedModule } from './shared/shared.module';
import { ClientContractComponent } from './transport-confirmation/client-contract/client-contract.component';
import { DeliveryDetailComponent } from './transport-confirmation/delivery-detail/delivery-detail.component';
import { TransporterContractComponent } from './transport-confirmation/transporter-contract/transporter-contract.component';
import { ClientWaybillComponent } from './waybill/client-waybill/client-waybill.component';
import { WaybillLoadComponent } from './waybill/waybill-load/waybill-load.component';
import { WaybillUnloadComponent } from './waybill/waybill-unload/waybill-unload.component';
import { WaybillComponent } from './waybill/waybill/waybill.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormTransporterComponent,
    // FormNewDeliveryComponent, //TODO remove when implemented away
    TransporterContractComponent,
    HeroContainerComponent,
    FormCustomerComponent,
    FormLoadDelayComponent,
    FormMerchandiseComponent,
    FormPathComponent,
    FormPricesComponent,
    DashboardComponent,
    DeliveryDetailComponent,
    ClientContractComponent,
    FormLoadComponent,
    FormShipComponent,
    WaybillLoadComponent,
    WaybillComponent,
    ClientWaybillComponent,
    FormUnloadComponent,
    WaybillUnloadComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
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
