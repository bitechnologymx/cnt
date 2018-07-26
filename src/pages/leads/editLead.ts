import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { EditCardLeadPage } from '../../pages/leads/editCardLead';

import { AppContants } from "../../providers/app.constants";
import { InformacionCliente } from "../../providers/interfaces/informacionCliente.interface";
import { InformacionClientesProvider } from "../../providers/services/informacion-clientes.services";

@Component({
  selector: 'page-editLead',
  templateUrl: 'editLead.html'
})
export class EditLeadPage implements OnInit {

  private informacionCliente: InformacionCliente;
  private saveResponse:string;
  private cancelarRegresarBtn:string = "Cancelar";

  ngOnInit(): void {
    console.log("EditLeadPage OnInit");
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private geolocation: Geolocation, private appContants: AppContants,
              private informacionClientesProvider: InformacionClientesProvider) {
    this.informacionCliente = this.navParams.get("informacionCliente");
    console.log("EditLeadPage : "); console.log(this.informacionCliente);
  }

  public saveLead(){
    let idUsuario = this.appContants.ACTIVE_USER.idUsuario;
    this.informacionClientesProvider.saveLead(this.informacionCliente).subscribe( data => {
      console.log("saveLead" + this.informacionCliente);
      if (data){
        this.saveResponse = "Tus datos fueron guardados correctamente.";
        this.cancelarRegresarBtn = "Regresar";
        this.informacionCliente.prospectoE.ultimaActualizacion = new Date().toString();
      }
    });
  }

  public cardLead() {
    this.navCtrl.pop();
  }

  public getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude); console.log(resp.coords.longitude);
      this.informacionCliente.prospectoE.direccionProspecto.latitud = resp.coords.latitude.toString();
      this.informacionCliente.prospectoE.direccionProspecto.longitud = resp.coords.longitude.toString();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
