import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { ClientContractComponent } from './transport-confirmation/client-contract/client-contract.component';
import { TransporterContractComponent } from './transport-confirmation/transporter-contract/transporter-contract.component';
import { WaybillClientComponent } from './waybill/waybill-client/waybill-client.component';
import { WaybillTransporterComponent } from './waybill/waybill-transporter/waybill-transporter.component';

const routes: Routes = [
  { path: '', component: FormTransporterComponent },
  // { path: 'livraison', component: FormNewDeliveryComponent }, //TODO remove later
  { path: 'nouveau-transport/client', component: FormCustomerComponent },
  { path: 'nouveau-transport/marchandise', component: FormMerchandiseComponent },
  { path: 'nouveau-transport/trajet', component: FormPathComponent },
  { path: 'nouveau-transport/delai-de-planche', component: FormLoadDelayComponent },
  { path: 'nouveau-transport/conditions-tarifaires', component: FormPricesComponent },
  { path: 'nouveau-transport/confirmation-transport', component: TransporterContractComponent },
  { path: 'client/contrat/:id', component: ClientContractComponent },
  { path: 'contrat/:id/bateau', component: FormShipComponent },
  { path: 'contrat/:id/chargement', component: FormLoadComponent },
  { path: 'contrat/:id/dechargement', component: FormUnloadComponent },
  { path: 'contrat/:id/lettre-voiture', component: WaybillTransporterComponent },
  { path: 'client/contrat/:id/lettre-voiture', component: WaybillClientComponent },
  { path: 'mes-transports', component: DashboardComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
