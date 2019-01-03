import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormCustomerComponent } from './contract-forms/form-customer/form-customer.component';
import { FormLoadDelayComponent } from './contract-forms/form-load-delay/form-load-delay.component';
import { FormLoadComponent } from './contract-forms/form-load/form-load.component';
import { FormMerchandiseComponent } from './contract-forms/form-merchandise/form-merchandise.component';
import { FormPathComponent } from './contract-forms/form-path/form-path.component';
import { FormPricesComponent } from './contract-forms/form-prices/form-prices.component';
import { FormShipComponent } from './contract-forms/form-ship/form-ship.component';
import { FormUnloadComponent } from './contract-forms/form-unload/form-unload.component';
import { ContractComponent } from './contract/contract.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormTransporterComponent } from './form-transporter/form-transporter.component';
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
import { WaybillActivityComponent } from './waybill/shared/waybill-activity/waybill-activity.component';
import { WaybillComponent } from './waybill/shared/waybill/waybill.component';
import { WaybillClientComponent } from './waybill/waybill-client/waybill-client.component';
import { WaybillTransporterComponent } from './waybill/waybill-transporter/waybill-transporter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroContainerComponent,
    FormTransporterComponent,
    FormCustomerComponent,
    FormLoadDelayComponent,
    FormMerchandiseComponent,
    FormPathComponent,
    FormPricesComponent,
    FormShipComponent,
    FormLoadComponent,
    FormUnloadComponent,
    DashboardComponent,
    DeliveryDetailComponent,
    TransporterContractComponent,
    ClientContractComponent,
    DeliveryActivityComponent,
    WaybillClientComponent,
    WaybillTransporterComponent,
    WaybillComponent,
    WaybillActivityComponent,
    ContractComponent,
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
