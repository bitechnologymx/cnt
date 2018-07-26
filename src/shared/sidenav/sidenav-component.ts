import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';
import { HomeVendedorPage } from '../../pages/home-vendedor/home-vendedor';

@Component({
  selector: 'side-nav',
  templateUrl: 'sidenav.html'
})
export class SideNavComponent {

    constructor(public navCtrl: NavController) {

    }

    goTo(){
      this.navCtrl.setRoot(HomeVendedorPage);
    }

    login(){
      this.navCtrl.setRoot(LoginPage);
    }

}
