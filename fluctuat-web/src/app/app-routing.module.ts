import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCustomerComponent } from './delivery/form-customer/form-customer.component';
import { FormLoadDelayComponent } from './delivery/form-load-delay/form-load-delay.component';
import { FormMerchandiseComponent } from './delivery/form-merchandise/form-merchandise.component';
import { FormPathComponent } from './delivery/form-path/form-path.component';
import { FormPricesComponent } from './delivery/form-prices/form-prices.component';
import { FormNewDeliveryComponent } from './form-new-delivery/form-new-delivery.component';
import { FormTransporterComponent } from './form-transporter/form-transporter.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', component: FormTransporterComponent },
  { path: 'livraison', component: FormNewDeliveryComponent },
  { path: 'resume', component: SummaryComponent },
  { path: 'client', component: FormCustomerComponent },
  { path: 'marchandise', component: FormMerchandiseComponent },
  { path: 'trajet', component: FormPathComponent },
  { path: 'delai-de-planche', component: FormLoadDelayComponent },
  { path: 'conditions-tarifaires', component: FormPricesComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
