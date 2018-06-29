import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Dashboard } from '../../shared/dashboard/dashboard';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  public dashboard(){
    //this.navCtrl.push(HomePage);
    this.navCtrl.setRoot(Dashboard);
  }

}
