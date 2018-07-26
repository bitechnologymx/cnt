import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DashboardPage } from '../../shared/dashboard/dashboard';

import { AppContants } from "../../providers/app.constants";
import { AutenticacionProvider } from "../../providers/services/autenticacion.services";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public IMAGE_URL = "assets/images/avatars/";

  public existUsuario = false;
  public usuarioImage = this.IMAGE_URL + "foto_login_b.jpg";

  public usuario:string = "";
  public password:string = "";

  public authResponse:string = "";

  constructor(public navCtrl: NavController, public splashScreen: SplashScreen,
              private autenticacionProvider: AutenticacionProvider, public appContants: AppContants) {

  }

  public changeUser(ev){
    var usuarioInput = this.usuario;
    usuarioInput = usuarioInput.toLowerCase();
    console.log("ChangeUser : " + this.usuario);
    //this.authResponse = usuarioInput;

    this.autenticacionProvider.getImage(usuarioInput).subscribe( result => {
       console.log(result);

       if (result==null){
         this.existUsuario = false;
         this.usuarioImage = this.IMAGE_URL + "foto_login_b.jpg";
       } else {
         this.existUsuario = true;
         this.usuarioImage = this.IMAGE_URL + result;
       }

       //this.authResponse = result.toString();
      },
      error => {
          console.log(this.appContants.inspect(error));
          this.authResponse = this.appContants.inspect(error);
      }
    );

    /**this.autenticacionProvider.getImage(usuarioInput).subscribe( data =>
      {
        if (data==null){
          this.existUsuario = false;
          this.usuarioImage = this.IMAGE_URL + "foto_login_b.jpg";
        } else {
          this.existUsuario = true;
          this.usuarioImage = this.IMAGE_URL + data;
        }
      });*/
  }

  public login(){
    var usuarioLogin = this.usuario;
    var passwordLogin = this.password;

    if(usuarioLogin == ""){
      this.authResponse = "Por favor, ingresa tu usuario";
    } else {

      if (this.existUsuario){
        this.auth(usuarioLogin,passwordLogin);
      } else {
          this.authResponse = "Por favor, revisa tu usuario";
      }

    }
  }

  public auth(username,password){
    this.autenticacionProvider.authentication(username,password).subscribe( data =>
      {
        if (data==null){
          this.authResponse = "Revisa tus credenciales";
        } else {
          console.log("auth : ");console.log(data);

          this.appContants.ACTIVE_USER = data;
          this.autenticacionProvider.updateLogin(data.idUsuario).subscribe( data => {} );
          this.navCtrl.push(DashboardPage, {'usuario':data});
        }
      });
  }

}
