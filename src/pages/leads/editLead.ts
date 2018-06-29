import { AfterViewInit, Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CardLeadPage } from '../../pages/leads/cardLead';

@Component({
  selector: 'page-editLead',
  templateUrl: 'editLead.html'
})
export class EditLeadPage {

  constructor(public navCtrl: NavController) {

  }

  public cardLead(){
    this.navCtrl.setRoot(CardLeadPage);
  }
}
