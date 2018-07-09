import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import { Dashboard } from '../../shared/dashboard2/dashboard';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public usuarioImage = "assets/images/foto_login_b.jpg";
  public usuario:string = "user";

  constructor(public navCtrl: NavController, private viewCtrl: ViewController) {

  }

  public dashboard(){
    //this.navCtrl.push(HomePage);
    //this.navCtrl.push(Dashboard);

    this.navCtrl
      .setRoot(Dashboard)
      .then(() => {
        // first we find the index of the current view controller:
        const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        this.navCtrl.remove(index);
      });
  }

  public goToDashboard(){
    var usuarioLogin = this.usuario;
    if (usuarioLogin=="super" || usuarioLogin=="user"){
      //$("#video-background").hide();
      //$("#divVideo").css('background-image', 'url("assets/images/others/img-29.jpg")');
      if (usuarioLogin=="super"){
        this.navCtrl.push(Dashboard);
      } else if (usuarioLogin=="user"){
        this.navCtrl.push(Dashboard);
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
