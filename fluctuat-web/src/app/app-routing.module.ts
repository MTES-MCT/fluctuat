import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './waybill/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/auth/auth.guard';
import { WaybillNewComponent } from './waybill/waybill-order/waybil-new/waybill-new.component';
import { WaybillEditionComponent } from './waybill/waybill-order/waybill-edition/waybill-edition.component';
import { WaybillLoadingComponent } from './waybill/waybill-loading/waybill-loading.component';
import { WaybillUnloadingComponent } from './waybill/waybill-unloading/waybill-unloading.component';
import { WaybillLoadValidationComponent } from './waybill/waybill-load-validation/waybill-load-validation.component';
import { WaybillUnloadValidationComponent } from './waybill/waybill-unload-validation/waybill-unload-validation.component';
import { WaybillDetailComponent } from './waybill/waybill-detail/waybill-detail.component';
import { WaybillAccessComponent } from './waybill/waybill-access/waybill-access.component';
import { DashboardAdminComponent } from './waybill/dahsboard-admin/dashboard-admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'acces-lettre-de-voiture', component: WaybillAccessComponent },
  { path: 'lettre-de-voiture/new', component: WaybillNewComponent, canActivate: [AuthGuard] },
  { path: 'lettre-de-voiture/:id/detail', component: WaybillDetailComponent },
  { path: 'lettre-de-voiture/:id/commande', component: WaybillEditionComponent },
  { path: 'lettre-de-voiture/:id/chargement', component: WaybillLoadingComponent },
  { path: 'lettre-de-voiture/:id/dechargement', component: WaybillUnloadingComponent },
  { path: 'confirmation-chargement/:id', component: WaybillLoadValidationComponent },
  { path: 'confirmation-dechargement/:id', component: WaybillUnloadValidationComponent },
  { path: 'mes-lettres-de-voiture', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'suivi-lettres-de-voiture', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
