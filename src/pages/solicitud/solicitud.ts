import { AfterViewInit, Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

import { Asignacion } from "../../providers/interfaces/asignacion.interface";

@Component({
  selector: 'page-solicitud',
  templateUrl: 'solicitud.html'
})
export class SolicitudPage {

  asignacion:Asignacion;

  step1Active:string = "in active";
  step2Active:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.asignacion = this.navParams.get("asignacion");
    window.scrollTo(0, 0);
  }

  public home(){
    this.navCtrl.setRoot(HomePage);
  }

  public showTab(id){
    this.step1Active = "";
    this.step2Active = "in active";
  }
}
