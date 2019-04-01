import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AlreadyLoggedGuard } from '../core/auth/already-logged.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { NgModule } from '@angular/core';

const accountRoutes: Routes = [
  { path: 'connexion', component: LoginComponent, canActivate: [AlreadyLoggedGuard] },
  { path: 'inscription', component: SignUpComponent, canActivate: [AlreadyLoggedGuard] },
  { path: 'changement-mot-de-passe', component: ChangePasswordComponent },
  { path: 'mot-de-passe-oublie', component: RecoverPasswordComponent },
];


@NgModule({
  imports: [
    RouterModule.forChild(accountRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule {
}
