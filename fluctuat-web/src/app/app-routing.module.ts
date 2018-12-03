import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormNewTransporter } from './form-new-transporter/form-new-transporter.component';

const routes: Routes = [
  {path: '', component: FormNewTransporter}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
