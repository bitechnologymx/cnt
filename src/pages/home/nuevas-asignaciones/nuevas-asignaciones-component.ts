import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SolicitudPage } from '../../../pages/solicitud/solicitud';
import { CardLeadPage } from '../../../pages/leads/cardLead';

import { ASIGNACIONES } from "../../../providers/data/data.asignaciones";
import { Asignacion } from "../../../providers/interfaces/asignacion.interface";

@Component({
  selector: 'nuevas-asignaciones',
  templateUrl: 'nuevas-asignaciones.html'
})
export class NuevasAsignacionesComponent {

    asignaciones: Asignacion[] = [];

    constructor(public navCtrl: NavController) {
      this.asignaciones = ASIGNACIONES.slice(0);
    }

    public cardLead(asignacion:Asignacion){
      this.navCtrl.push(CardLeadPage, {'asignacion':asignacion});
    }

    public solicitud(asignacion:Asignacion){
      this.navCtrl.push(SolicitudPage, {'asignacion':asignacion});
    }

}
