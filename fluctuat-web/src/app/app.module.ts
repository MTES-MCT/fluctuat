import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeroContainerComponent } from './shared/hero-container.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthService } from './core/auth/auth.service';
import { LoginComponent } from './login/login.component';
import { UnauthorizedInterceptor } from './core/auth/unauthorized.interceptor';
import { AuthRequestInterceptor } from './core/auth/auth-request.interceptor';
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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroContainerComponent,
    HomeComponent,
    SignUpComponent,
    LoginComponent,
    WaybillNewComponent,
    WaybillEditionComponent,
    WaybillLoadingComponent,
    WaybillOrderInfoComponent,
    WaybillOrderFormComponent,
    WaybillDetailComponent,
    WaybillUnloadingComponent,
    WaybillLoadValidationComponent,
    WaybillLoadInfoComponent,
    WaybillUnloadValidationComponent,
    WaybillUnloadInfoComponent,
    DashboardComponent,
    WaybillOptionsComponent
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
      deps: [AuthService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
