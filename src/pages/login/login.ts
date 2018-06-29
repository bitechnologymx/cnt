import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Dashboard } from '../../shared/dashboard/dashboard';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public usuarioImage = "assets/images/foto_login_b.jpg";
  public usuario:string = "supe";

  constructor(public navCtrl: NavController) {

  }

  public dashboard(){
    //this.navCtrl.push(HomePage);
    this.navCtrl.setRoot(Dashboard);
  }

  public goToDashboard(){
    var usuarioLogin = this.usuario;
    if (usuarioLogin=="super" || usuarioLogin=="user"){
      //$("#video-background").hide();
      //$("#divVideo").css('background-image', 'url("assets/images/others/img-29.jpg")');
      if (usuarioLogin=="super"){
        this.navCtrl.setRoot(Dashboard);
      } else if (usuarioLogin=="user"){
        this.navCtrl.setRoot(Dashboard);
      }
      return false;
    }
  }

  public changeUser(ev){
    var usuarioInput = ev.target.value;
    usuarioInput = usuarioInput.toLowerCase();
    console.log(usuarioInput);
    if (usuarioInput=="super"){
      this.usuarioImage = "assets/images/foto_login.jpg";
    } else if (usuarioInput=="user"){
      this.usuarioImage = "assets/images/foto_login2.jpg";
    } else {
      this.usuarioImage = "assets/images/foto_login_b.jpg";
    }
  }

}
