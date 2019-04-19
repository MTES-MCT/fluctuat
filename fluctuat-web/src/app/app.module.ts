import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AuthService } from './core/auth/auth.service';
import { UnauthorizedInterceptor } from './core/auth/unauthorized.interceptor';
import { WaybillEditionComponent } from './waybill/waybill-order/waybill-edition/waybill-edition.component';
import { WaybillLoadingComponent } from './waybill/waybill-loading/waybill-loading.component';
import { WaybillOrderFormComponent } from './waybill/waybill-order/shared/waybill-order-form/waybill-order-form.component';
import { WaybillDetailComponent } from './waybill/waybill-detail/waybill-detail.component';
import { WaybillNewComponent } from './waybill/waybill-order/waybil-new/waybill-new.component';
import { WaybillService } from './waybill/shared/waybill.service';
import { WaybillUnloadingComponent } from './waybill/waybill-unloading/waybill-unloading.component';
import { WaybillLoadValidationComponent } from './waybill/waybill-load-validation/waybill-load-validation.component';
import { WaybillLoadInfoComponent } from './waybill/shared/waybill-load-info/waybill-load-info.component';
import { WaybillUnloadValidationComponent } from './waybill/waybill-unload-validation/waybill-unload-validation.component';
import { WaybillUnloadInfoComponent } from './waybill/shared/waybill-unload-info/waybill-unload-info.component';
import { WaybillOrderInfoComponent } from './waybill/shared/waybill-order-info/waybill-order-info.component';
import { DashboardComponent } from './waybill/dashboard/dashboard.component';
import { WaybillOptionsComponent } from './waybill/shared/waybill-options/waybill-options.component';
import { WaybillAccessComponent } from './waybill/waybill-access/waybill-access.component';
import { WaybillShareComponent } from './waybill/shared/waybill-share/waybill-share.component';
import { NotifyService } from './waybill/shared/notify.service';
import { ContactsService } from './waybill/shared/contacts.service';
import { LoadStatusNotificationComponent } from './waybill/waybill-detail/load-status-notification.component';
import { DashboardAdminComponent } from './waybill/dahsboard-admin/dashboard-admin.component';
import { AccountModule } from './account/account.module';
import { LoadValidationService } from './waybill/shared/load-validation.service';
import { UnloadValidationService } from './waybill/shared/unload-validation.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotFoundInterceptor } from './core/not-found.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    WaybillNewComponent,
    WaybillEditionComponent,
    WaybillLoadingComponent,
    WaybillOrderInfoComponent,
    WaybillOrderFormComponent,
    WaybillDetailComponent,
    LoadStatusNotificationComponent,
    WaybillUnloadingComponent,
    WaybillLoadValidationComponent,
    WaybillLoadInfoComponent,
    WaybillUnloadValidationComponent,
    WaybillUnloadInfoComponent,
    DashboardComponent,
    DashboardAdminComponent,
    WaybillOptionsComponent,
    WaybillAccessComponent,
    WaybillShareComponent,
    NotFoundComponent,
  ],
  imports: [
    AccountModule,
    BrowserModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    WaybillService,
    LoadValidationService,
    UnloadValidationService,
    NotifyService,
    ContactsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotFoundInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
