import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormTransporterComponent } from './form-transporter/form-transporter.component';

const routes: Routes = [
  { path: '', component: FormTransporterComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
