import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormNewDeliveryComponent } from './form-new-delivery/form-new-delivery.component';
import { FormTransporterComponent } from './form-transporter/form-transporter.component';

const routes: Routes = [
  { path: '', component: FormTransporterComponent },
  { path: 'trajet', component: FormNewDeliveryComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
