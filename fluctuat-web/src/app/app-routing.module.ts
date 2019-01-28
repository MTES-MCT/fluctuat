import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './waybill/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth/auth.guard';
import { AlreadyLoggedGuard } from './core/auth/already-logged.guard';
import { WaybillNewComponent } from './waybill/waybill-order/waybil-new/waybill-new.component';
import { WaybillSummaryComponent } from './waybill/waybill-summary/waybill-summary.component';
import { WaybillEditionComponent } from './waybill/waybill-order/waybill-edition/waybill-edition.component';
import { WaybillLoadingComponent } from './waybill/waybill-loading/waybill-loading.component';
import { WaybillUnloadingComponent } from './waybill/waybill-unloading/waybill-unloading.component';
import { WaybillLoadValidationComponent } from './waybill/waybill-load-validation/waybill-load-validation.component';
import { WaybillUnloadValidationComponent } from './waybill/waybill-unload-validation/waybill-unload-validation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'connexion', component: LoginComponent, canActivate: [ AlreadyLoggedGuard ] },
  { path: 'inscription', component: SignUpComponent, canActivate: [ AlreadyLoggedGuard ] },
  { path: 'lettre-de-voiture/new', component: WaybillNewComponent },
  { path: 'lettre-de-voiture/:id/resume', component: WaybillSummaryComponent },
  { path: 'lettre-de-voiture/:id/commande', component: WaybillEditionComponent },
  { path: 'lettre-de-voiture/:id/chargement', component: WaybillLoadingComponent },
  { path: 'lettre-de-voiture/:id/validation-chargement', component: WaybillLoadValidationComponent },
  { path: 'lettre-de-voiture/:id/dechargement', component: WaybillUnloadingComponent },
  { path: 'lettre-de-voiture/:id/validation-dechargement', component: WaybillUnloadValidationComponent },
  { path: 'mes-lettres-de-voiture', component: DashboardComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
