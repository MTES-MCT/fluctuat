import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DeliveryActivityComponent } from './transport-confirmation/shared/delivery-activity/delivery-activity.component';
import { DeliveryDetailComponent } from './transport-confirmation/shared/delivery-detail/delivery-detail.component';
import { TransportConfirmationClientComponent } from './transport-confirmation/transport-confirmation-client/transport-confirmation-client.component';
import { TransportConfirmationTransporterComponent } from './transport-confirmation/transport-confirmation-transporter/transport-confirmation-transporter.component';
import { HomeComponent } from './home/home.component';
import { TransporterComponent } from './transporter/transporter.component';
import { TransporterHeaderComponent } from './transporter-header/transporter-header.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthService } from './providers/auth/auth.service';
import { LoginComponent } from './login/login.component';
import { UnauthorizedInterceptor } from './providers/auth/unauthorized.interceptor';
import { AuthRequestInterceptor } from './providers/auth/auth-request.interceptor';
import { WaybillEditionComponent } from './waybill/waybill-order/waybill-edition/waybill-edition.component';
import { WaybillLoadingComponent } from './waybill/waybill-loading/waybill-loading.component';
import { WaybillOrderInfoComponent } from './waybill/waybill-order/shared/waybill-order-info/waybill-order-info.component';
import { WaybillSummaryComponent } from './waybill/waybill-summary/waybill-summary.component';
import { WaybillNewComponent } from './waybill/waybill-order/waybil-new/waybill-new.component';
import { WaybillService } from './waybill/shared/waybill.service';
import { WaybillUnloadingComponent } from './waybill/waybill-unloading/waybill-unloading.component';
import { WaybillLoadValidationComponent } from './waybill/waybill-load-validation/waybill-load-validation.component';
import { WaybillLoadInfoComponent } from './waybill/shared/waybill-load-info/waybill-load-info.component';

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
    TransportConfirmationTransporterComponent,
    TransportConfirmationClientComponent,
    DeliveryActivityComponent,
    ContractComponent,
    HomeComponent,
    TransporterComponent,
    TransporterHeaderComponent,
    SignUpComponent,
    LoginComponent,
    WaybillNewComponent,
    WaybillEditionComponent,
    WaybillLoadingComponent,
    WaybillOrderInfoComponent,
    WaybillSummaryComponent,
    WaybillUnloadingComponent,
    WaybillLoadValidationComponent,
    WaybillLoadInfoComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    DeliveryService,
    TransporterService,
    ShipService,
    LoadInfoService,
    UnloadInfoService,
    ContractService,
    WaybillService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthRequestInterceptor,
      multi: true,
      deps: [ AuthService ]
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
