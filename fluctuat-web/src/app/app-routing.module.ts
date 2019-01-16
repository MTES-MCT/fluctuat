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
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { TransportConfirmationClientComponent } from './transport-confirmation/transport-confirmation-client/transport-confirmation-client.component';
import { TransportConfirmationTransporterComponent } from './transport-confirmation/transport-confirmation-transporter/transport-confirmation-transporter.component';
import { TransporterComponent } from './transporter/transporter.component';
import { WaybillClientComponent } from './waybill/waybill-client/waybill-client.component';
import { WaybillTransporterComponent } from './waybill/waybill-transporter/waybill-transporter.component';
import { FormTransporterComponent } from './form-transporter/form-transporter.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inscription', component: SignUpComponent },
  {
    path: 'transporteur', component: TransporterComponent,
    children: [
      { path: '', redirectTo:'mes-transports', pathMatch:"full" },
      { path: 'mon-compte', component: FormTransporterComponent },
      { path: 'nouveau-transport/client', component: FormCustomerComponent },
      { path: 'nouveau-transport/marchandise', component: FormMerchandiseComponent },
      { path: 'nouveau-transport/trajet', component: FormPathComponent },
      { path: 'nouveau-transport/delai-de-planche', component: FormLoadDelayComponent },
      { path: 'nouveau-transport/conditions-tarifaires', component: FormPricesComponent },
      { path: 'nouveau-transport/confirmation-transport', component: TransportConfirmationTransporterComponent },
      { path: 'contrat/:id', component: ContractComponent },
      { path: 'contrat/:id/confirmation-transport', component: TransportConfirmationTransporterComponent },
      { path: 'contrat/:id/bateau', component: FormShipComponent },
      { path: 'contrat/:id/chargement', component: FormLoadComponent },
      { path: 'contrat/:id/dechargement', component: FormUnloadComponent },
      { path: 'contrat/:id/lettre-voiture', component: WaybillTransporterComponent },
      { path: 'mes-transports', component: DashboardComponent },
    ]
  },

  { path: 'client/contrat/:id/confirmation-transport', component: TransportConfirmationClientComponent },
  { path: 'client/contrat/:id/lettre-voiture', component: WaybillClientComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
