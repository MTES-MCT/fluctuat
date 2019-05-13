import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AuthService } from './core/auth/auth.service';
import { UnauthorizedInterceptor } from './core/auth/unauthorized.interceptor';
import { WaybillFormOrderEditComponent } from './waybill/waybill-form-order/waybill-form-order-edition/waybill-form-order-edit.component';
import { WaybillFormOrderNewComponent } from './waybill/waybill-form-order/waybill-form-order-new/waybill-form-order-new.component';
import { WaybillFormOrderComponent } from './waybill/waybill-form-order/shared/waybill-form-order/waybill-form-order.component';
import { WaybillFormUnloadComponent } from './waybill/waybill-form-unload/waybill-form-unload.component';
import { WaybillFormLoadComponent } from './waybill/waybill-form-load/waybill-form-load.component';
import { WaybillDetailComponent } from './waybill/waybill-detail/waybill-detail.component';
import { WaybillService } from './waybill/shared/waybill.service';
import { WaybillLoadValidationComponent } from './waybill/waybill-load-validation/waybill-load-validation.component';
import { WaybillLoadInfoComponent } from './waybill/shared/waybill-load-info/waybill-load-info.component';
import { WaybillUnloadValidationComponent } from './waybill/waybill-unload-validation/waybill-unload-validation.component';
import { WaybillUnloadInfoComponent } from './waybill/shared/waybill-unload-info/waybill-unload-info.component';
import { WaybillOrderInfoComponent } from './waybill/shared/waybill-order-info/waybill-order-info.component';
import { DashboardComponent } from './waybill/dashboard/dashboard.component';
import { WaybillOptionsComponent } from './waybill/shared/waybill-options/waybill-options.component';
import { WaybillAccessComponent } from './waybill/waybill-access/waybill-access.component';
import { ContactsService } from './waybill/shared/contacts.service';
import { LoadStatusNotificationComponent } from './waybill/waybill-detail/load-status-notification.component';
import { DashboardAdminComponent } from './waybill/dahsboard-admin/dashboard-admin.component';
import { AccountModule } from './account/account.module';
import { LoadValidationService } from './waybill/shared/load-validation.service';
import { UnloadValidationService } from './waybill/shared/unload-validation.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotFoundInterceptor } from './core/not-found.interceptor';
import { WaybillShareComponent } from './waybill/waybill-detail/waybill-share/waybill-share.component';
import { WaybillShareService } from './waybill/waybill-detail/waybill-share/waybill-share.service';
import { DatePipe } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { StatCardComponent } from './stats/stat-card/stat-card.component';
import { StatsService } from './stats/stats.service';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    WaybillFormOrderComponent,
    WaybillFormOrderNewComponent,
    WaybillFormOrderEditComponent,
    WaybillFormLoadComponent,
    WaybillFormUnloadComponent,
    WaybillOrderInfoComponent,
    WaybillDetailComponent,
    LoadStatusNotificationComponent,
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
    FooterComponent,
    StatsComponent,
    StatCardComponent,
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
    WaybillShareService,
    ContactsService,
    StatsService,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
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
