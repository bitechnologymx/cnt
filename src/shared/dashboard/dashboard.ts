import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [NgbDropdownConfig]
})
export class DashboardPage {

  private homePage = HomePage;
  public app : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, config: NgbDropdownConfig) {
    config.placement = 'bottom-right';
    config.autoClose = false;
    this.app = {
      layout: {
        sidePanelOpen: false,
        isMenuOpened: true,
        isMenuCollapsed: false
      }
    };
  }

  login(){
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

}
