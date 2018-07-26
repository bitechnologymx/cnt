import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

import { AutenticacionProvider } from "../../providers/services/autenticacion.services";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  providers: [AutenticacionProvider]
})
export class LoginPageModule {


}
