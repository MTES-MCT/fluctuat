import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './waybill/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/auth/auth.guard';
import { WaybillFormOrderNewComponent } from './waybill/waybill-form-order/waybill-form-order-new/waybill-form-order-new.component';
import { WaybillFormOrderEditComponent } from './waybill/waybill-form-order/waybill-form-order-edit/waybill-form-order-edit.component';
import { WaybillFormLoadComponent } from './waybill/waybill-form-load/waybill-form-load.component';
import { WaybillFormUnloadComponent } from './waybill/waybill-form-unload/waybill-form-unload.component';
import { WaybillLoadValidationComponent } from './waybill/waybill-load-validation/waybill-load-validation.component';
import { WaybillUnloadValidationComponent } from './waybill/waybill-unload-validation/waybill-unload-validation.component';
import { WaybillDetailComponent } from './waybill/waybill-detail/waybill-detail.component';
import { WaybillAccessComponent } from './waybill/waybill-access/waybill-access.component';
import { DashboardAdminComponent } from './waybill/dahsboard-admin/dashboard-admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StatsComponent } from './stats/stats.component';
import { ApiKeyAdminComponent } from './api-key-admin/api-key-admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'acces-lettre-de-voiture', component: WaybillAccessComponent },
  { path: 'lettre-de-voiture/new', component: WaybillFormOrderNewComponent, canActivate: [AuthGuard] },
  { path: 'lettre-de-voiture/:id/detail', component: WaybillDetailComponent },
  { path: 'lettre-de-voiture/:id/commande', component: WaybillFormOrderEditComponent },
  { path: 'lettre-de-voiture/:id/chargement', component: WaybillFormLoadComponent },
  { path: 'lettre-de-voiture/:id/dechargement', component: WaybillFormUnloadComponent },
  { path: 'confirmation-chargement/:id', component: WaybillLoadValidationComponent },
  { path: 'confirmation-dechargement/:id', component: WaybillUnloadValidationComponent },
  { path: 'mes-lettres-de-voiture', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'suivi-lettres-de-voiture', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'stats', component: StatsComponent },
  { path: 'cles-api', component: ApiKeyAdminComponent, canActivate: [AuthGuard] },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
