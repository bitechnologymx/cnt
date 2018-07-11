import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'side-nav',
  templateUrl: 'sidenav.html'
})
export class SideNavComponent {

    constructor(public navCtrl: NavController) {

    }

    goTo(){
      this.navCtrl.setRoot(HomePage);
    }

    login(){
      this.navCtrl.setRoot(LoginPage);
    }

}
