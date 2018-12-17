import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractComponent } from './delivery/contract/contract.component';
import { DashboardComponent } from './delivery/dashboard/dashboard.component';
import { FormCustomerComponent } from './delivery/form-customer/form-customer.component';
import { FormLoadDelayComponent } from './delivery/form-load-delay/form-load-delay.component';
import { FormMerchandiseComponent } from './delivery/form-merchandise/form-merchandise.component';
import { FormPathComponent } from './delivery/form-path/form-path.component';
import { FormPricesComponent } from './delivery/form-prices/form-prices.component';
import { SummaryComponent } from './delivery/summary/summary.component';
import { FormNewDeliveryComponent } from './form-new-delivery/form-new-delivery.component';
import { FormTransporterComponent } from './form-transporter/form-transporter.component';

const routes: Routes = [
  { path: '', component: FormTransporterComponent },
  { path: 'livraison', component: FormNewDeliveryComponent },
  { path: 'nouveau-transport/resume', component: SummaryComponent },
  { path: 'nouveau-transport/client', component: FormCustomerComponent },
  { path: 'nouveau-transport/marchandise', component: FormMerchandiseComponent },
  { path: 'nouveau-transport/trajet', component: FormPathComponent },
  { path: 'nouveau-transport/delai-de-planche', component: FormLoadDelayComponent },
  { path: 'nouveau-transport/conditions-tarifaires', component: FormPricesComponent },
  { path: 'contrat/:id', component: ContractComponent },
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
