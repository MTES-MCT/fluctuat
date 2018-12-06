import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormNewDeliveryComponent } from './form-new-delivery/form-new-delivery.component';
import { FormTransporterComponent } from './form-transporter/form-transporter.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', component: FormTransporterComponent },
  { path: 'trajet', component: FormNewDeliveryComponent },
  { path: 'resume', component: SummaryComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
