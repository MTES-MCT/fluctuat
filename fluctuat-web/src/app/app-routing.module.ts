import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormCustomerComponent } from './contract-forms/form-customer/form-customer.component';
import { FormLoadDelayComponent } from './contract-forms/form-load-delay/form-load-delay.component';
import { FormLoadComponent } from './contract-forms/form-load/form-load.component';
import { FormMerchandiseComponent } from './contract-forms/form-merchandise/form-merchandise.component';
import { FormPathComponent } from './contract-forms/form-path/form-path.component';
import { FormPricesComponent } from './contract-forms/form-prices/form-prices.component';
import { FormShipComponent } from './contract-forms/form-ship/form-ship.component';
import { FormUnloadComponent } from './contract-forms/form-unload/form-unload.component';
import { ContractComponent } from './contract/contract.component';
import { DashboardComponent } from './waybill/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { TransporterComponent } from './transporter/transporter.component';
import { FormTransporterComponent } from './form-transporter/form-transporter.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './providers/auth/auth.guard';
import { AlreadyLoggedGuard } from './providers/auth/already-logged.guard';
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
  {
    path: 'transporteur', component: TransporterComponent,
    canActivate: [ AuthGuard ],
    canActivateChild: [ AuthGuard ],
    children: [
      { path: 'mon-compte', component: FormTransporterComponent },
      { path: 'nouveau-transport/client', component: FormCustomerComponent },
      { path: 'nouveau-transport/marchandise', component: FormMerchandiseComponent },
      { path: 'nouveau-transport/trajet', component: FormPathComponent },
      { path: 'nouveau-transport/delai-de-planche', component: FormLoadDelayComponent },
      { path: 'nouveau-transport/conditions-tarifaires', component: FormPricesComponent },
      { path: 'contrat/:id', component: ContractComponent },
      { path: 'contrat/:id/bateau', component: FormShipComponent },
      { path: 'contrat/:id/chargement', component: FormLoadComponent },
      { path: 'contrat/:id/dechargement', component: FormUnloadComponent },
    ]
  },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
