import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content  } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { EditLeadPage } from '../../pages/leads/editLead';

import { Asignacion } from "../../providers/interfaces/asignacion.interface";

@Component({
  selector: 'page-cardLead',
  templateUrl: 'cardLead.html'
})
export class CardLeadPage {

  @ViewChild(Content) content: Content;

  asignacion:Asignacion;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.asignacion = this.navParams.get("asignacion");
    window.scrollTo(0, 0);
  }

  public home(){
    this.navCtrl.setRoot(HomePage);
  }

  public editLead(){
    this.navCtrl.push(EditLeadPage, {'asignacion':this.asignacion});
  }
}
