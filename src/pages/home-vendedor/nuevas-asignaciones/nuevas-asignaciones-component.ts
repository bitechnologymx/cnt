import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { SolicitudPage } from '../../../pages/solicitud/solicitud';
import { EditCardLeadPage } from '../../../pages/leads/editCardLead';

//import { ASIGNACIONES } from "../../../providers/data/data.asignaciones";
//import { Asignacion } from "../../../providers/interfaces/asignacion.interface";

import { InformacionCliente } from "../../../providers/interfaces/informacionCliente.interface";

import { InformacionClientesProvider } from "../../../providers/services/informacion-clientes.services";
import { ProspectoProvider } from "../../../providers/services/prospecto.services";

@Component({
  selector: 'nuevas-asignaciones',
  templateUrl: 'nuevas-asignaciones.html',
  providers: [NgbDropdownConfig]
})
export class NuevasAsignacionesComponent {

  //@ViewChild('etapaDrop') private etapaDrop: NgbDropdown;

  private informacionClientes: InformacionCliente[] = [];
  private activeEstatus;
  private activeEstatusComentario;

  constructor(public navCtrl: NavController, config: NgbDropdownConfig,
              private prospectoProvider: ProspectoProvider, private infoClienteProvider: InformacionClientesProvider) {
    config.placement = 'bottom';
    config.autoClose = 'outside';
    (<any>config).autoClose = 'outside';
  }

  borrarAsignacion(informacionCliente: InformacionCliente){
    console.log("NuevasAsignacionesComponent borrarAsignacion : " + informacionCliente.idCliente);

    this.infoClienteProvider.borrarAsignacion(informacionCliente.idCliente).subscribe( data => {
      console.log("borrarAsignacion " + data);
      if (data){
        let index:number = 0;
        let indexEq:number = -1;
        for (let infoCliente of this.informacionClientes) {
          if (infoCliente.idCliente == informacionCliente.idCliente){
            indexEq = index;
          }
          index = index+1;
        }
        this.informacionClientes.splice(indexEq,1);
      }
    });
  }

  selectDropProbabilidad(probabilidadDropdown, informacionCliente: InformacionCliente){
    console.log("NuevasAsignacionesComponent selectDropEstatus : " + informacionCliente.prospectoE.idCliente + " - " + this.activeEstatusComentario);

    let probabilidad = informacionCliente.prospectoE.probabilidad;

    this.prospectoProvider.updateProspectoShortProperty(informacionCliente.prospectoE.idCliente, "probabilidad", probabilidad).subscribe( data => {
      console.log("updateProspectoShortProperty estatus" + data);
      if (data){ informacionCliente.prospectoE.ultimaActualizacion = new Date().toString(); }
    });
    probabilidadDropdown.close();
  }

  selectDropEstatus(estatusDrop, informacionCliente: InformacionCliente){
    console.log("NuevasAsignacionesComponent selectDropEstatus : " + informacionCliente.prospectoE.idCliente + " - " + this.activeEstatusComentario);

    let estatus = informacionCliente.prospectoE.estatus; //this.activeEstatus;
    let estatusComentario = informacionCliente.prospectoE.estatusComentario; //this.activeEstatusComentario;

    this.prospectoProvider.updateProspectoShortProperty(informacionCliente.prospectoE.idCliente, "estatus", estatus).subscribe( data => {
      console.log("updateProspectoShortProperty estatus" + data);
      if (data){
        informacionCliente.prospectoE.ultimaActualizacion = new Date().toString();
        this.prospectoProvider.updateProspectoStringProperty(informacionCliente.prospectoE.idCliente, "estatusComentario", estatusComentario).subscribe( data => {
          console.log("updateProspectoShortProperty estatusComentario" + data);
        });
      }
    });
    estatusDrop.close();
  }

  public selectDropEtapa(etapaDrop, informacionCliente: InformacionCliente, etapa) {
    console.log("NuevasAsignacionesComponent selectDropEtapa : " + informacionCliente.prospectoE.idCliente);
    this.prospectoProvider.updateProspectoShortProperty(informacionCliente.prospectoE.idCliente, "etapa", etapa).subscribe( data => {
      console.log("updateProspectoShortProperty etapa" + data);
      if (data){
        informacionCliente.prospectoE.etapa = etapa;
        informacionCliente.prospectoE.ultimaActualizacion = new Date().toString();
        this.prospectoProvider.insertProspectoEtapaHistorial(informacionCliente.prospectoE.idCliente, etapa).subscribe( data => {
          console.log("insertProspectoEtapaHistorial" + data);
        });
      }
    });
    etapaDrop.close();
  }

  public initAsignaciones(informacionClientes: InformacionCliente[]) {
    console.log("NuevasAsignacionesComponent initAsignaciones ");
    this.informacionClientes = informacionClientes;
  }

  public cardLead(informacionCliente: InformacionCliente) {
    this.navCtrl.push(EditCardLeadPage, { 'informacionCliente': informacionCliente });
  }

  public solicitud(informacionCliente: InformacionCliente) {
    this.navCtrl.push(SolicitudPage, { 'informacionCliente': informacionCliente });
  }

}
