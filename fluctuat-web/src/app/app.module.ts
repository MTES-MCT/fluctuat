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
import { ContractComponent } from './contract/contract.component';
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
import { DeliveryActivityComponent } from './transport-confirmation/shared/delivery-activity/delivery-activity.component';
import { DeliveryDetailComponent } from './transport-confirmation/shared/delivery-detail/delivery-detail.component';
import { TransporterContractComponent } from './transport-confirmation/transporter-contract/transporter-contract.component';
import { WaybillComponent } from './waybill/shared/waybill/waybill.component';
import { WaybillClientComponent } from './waybill/waybill-client/waybill-client.component';
import { WaybillTransporterComponent } from './waybill/waybill-transporter/waybill-transporter.component';
import { WaybillActivityComponent } from './waybill/shared/waybill-activity/waybill-activity.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormTransporterComponent,
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
    WaybillClientComponent,
    WaybillTransporterComponent,
    WaybillComponent,
    FormUnloadComponent,
    ContractComponent,
    DeliveryActivityComponent,
    WaybillActivityComponent,
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
