import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ChangePasswordComponent,
    RecoverPasswordComponent
  ],
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
})
export class AccountModule {

}
