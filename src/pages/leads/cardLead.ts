import { AfterViewInit, Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { EditLeadPage } from '../../pages/leads/editLead';

@Component({
  selector: 'page-cardLead',
  templateUrl: 'cardLead.html'
})
export class CardLeadPage {

  constructor(public navCtrl: NavController) {

  }

  public home(){
    this.navCtrl.setRoot(HomePage);
  }

  public editLead(){
    this.navCtrl.setRoot(EditLeadPage);
  }
}
