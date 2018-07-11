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

  step1Tab:string = "in active"; step2Tab:string = ""; step3Tab:string = "";
  step4Tab:string = ""; step5Tab:string = ""; step6Tab:string = "";
  step1Btn:string = "active show"; step2Btn:string = ""; step3Btn:string = "";
  step4Btn:string = ""; step5Btn:string = ""; step6Btn:string = "";

  ssTelefoniaTab:string = "in active"; ssInternetTab:string = ""; ssTelevisionTab:string = "";
  ssTelefoniaLink:string = "active"; ssInternetLink:string = ""; ssTelevisionLink:string = "";

  fpTelefoniaTab:string = "in active"; fpInternetTab:string = ""; fpTelevisionTab:string = ""; fpAutorizacionTab:string = "";
  fpTelefoniaLink:string = "active"; fpInternetLink:string = ""; fpTelevisionLink:string = ""; fpAutorizacionLink:string = "";

  isCollapsedTelefoniaVentanilla:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.asignacion = this.navParams.get("asignacion");
    window.scrollTo(0, 0);
  }

  public home(){
    this.navCtrl.setRoot(HomePage);
  }

  public showTab(id){
    this.hideTabs();
    if (id==1){ this.step1Tab = "in active"; this.step1Btn = "active show";}
    else if (id==2){ this.step2Tab = "in active"; this.step2Btn = "active show";}
    else if (id==3){ this.step3Tab = "in active"; this.step3Btn = "active show";}
    else if (id==4){ this.step4Tab = "in active"; this.step4Btn = "active show";}
    else if (id==5){ this.step5Tab = "in active"; this.step5Btn = "active show";}
    else if (id==6){ this.step6Tab = "in active"; this.step6Btn = "active show";}
    window.scrollTo(0, 0);
  }

  public hideTabs(){
    this.step1Tab = "";this.step2Tab = "";this.step3Tab = "";
    this.step4Tab = "";this.step5Tab = "";this.step6Tab = "";
    this.step1Btn = "";this.step2Btn = "";this.step3Btn = "";
    this.step4Btn = "";this.step5Btn = "";this.step6Btn = "";
  }

  public showTabServiciosFijos(id){
    this.hideTabsServiciosFijos();
    if (id==1){ this.ssTelefoniaTab = "in active"; this.ssTelefoniaLink = "active";}
    else if (id==2){ this.ssInternetTab = "in active"; this.ssInternetLink = "active";}
    else if (id==3){ this.ssTelevisionTab = "in active"; this.ssTelevisionLink = "active";}
  }

  public hideTabsServiciosFijos(){
    this.ssTelefoniaTab = "";this.ssInternetTab = "";this.ssTelevisionTab = "";
    this.ssTelefoniaLink = "";this.ssInternetLink = "";this.ssTelevisionLink = "";
  }

  public showTabFormaPago(id){
    this.hideTabsFormaPago();
    if (id==1){ this.fpTelefoniaTab = "in active"; this.fpTelefoniaLink = "active";}
    else if (id==2){ this.fpInternetTab = "in active"; this.fpInternetLink = "active";}
    else if (id==3){ this.fpTelevisionTab = "in active"; this.fpTelevisionLink = "active";}
    else if (id==4){ this.fpAutorizacionTab = "in active"; this.fpAutorizacionLink = "active";}
  }

  public hideTabsFormaPago(){
    this.fpTelefoniaTab = "";this.fpInternetTab = "";this.fpTelevisionTab = "";this.fpAutorizacionTab = "";
    this.fpTelefoniaLink = "";this.fpInternetLink = "";this.fpTelevisionLink = "";this.fpAutorizacionLink = "";
  }
}
