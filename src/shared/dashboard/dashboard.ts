import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  private homePage = HomePage;
  public app : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.app = {
      layout: {
        sidePanelOpen: false,
        isMenuOpened: true,
        isMenuCollapsed: false
      }
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

}
