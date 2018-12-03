import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormNewComponent } from './form-new/form-new.component';

const routes: Routes = [
  {path: '', component: FormNewComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
