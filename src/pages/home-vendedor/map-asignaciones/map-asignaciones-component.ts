import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppContants } from "../../../providers/app.constants";
import { CacheProvider } from "../../../providers/services/cache.services";

import { SolicitudPage } from '../../../pages/solicitud/solicitud';
import { EditCardLeadPage } from '../../../pages/leads/editCardLead';

import { Marker } from "../../../providers/interfaces/marker.interface";

import { ASIGNACIONES } from "../../../providers/data/data.asignaciones";
import { Asignacion } from "../../../providers/interfaces/asignacion.interface";

import { InformacionCliente } from "../../../providers/interfaces/informacionCliente.interface";

@Component({
  selector: 'map-asignaciones',
  templateUrl: 'map-asignaciones.html'
})
export class MapAsignacionesComponent {

  markers: Marker[] = [];

  activeMarker = {
    display: true,
    nombre: "",
    noAsignacion: "",
    asignacion: null,
    lat: null,
    lng: null,
  };

  constructor(public navCtrl: NavController, public appContants: AppContants, private cacheProvider: CacheProvider) {
    console.log("Map Asignaciones Component");
  }

  public initMapAndMarkers(informacionClientes:InformacionCliente[]){

    console.log("Map Asignaciones initMapAndMarkers ");

    let randomLat: number, randomLng: number;
    this.markers = [];

    for (let informacionCliente of informacionClientes) {

      //console.log(informacionCliente);
      if (informacionCliente.prospectoE!=null && informacionCliente.prospectoE.direccionProspecto!=null){
        let marker: Marker = this.getMarker(informacionCliente);
        this.markers.push(marker);
      }
    }
  }

  private getMarker(informacionCliente: InformacionCliente) {

    let marker: Marker = {} as Marker;

    marker.title = informacionCliente.nombreApellidosRazonSocial;

    //console.log("getMarkert : "); console.log(informacionCliente);

    let latitud = informacionCliente.prospectoE.direccionProspecto.latitud;
    let longitud = informacionCliente.prospectoE.direccionProspecto.longitud;

    marker.position = [latitud, longitud];
    marker.latitud = latitud;
    marker.longitud = longitud;

    marker.informacionCliente = informacionCliente;

    if (informacionCliente.prospectoE.etapa == this.appContants.ETAPA_PROSPECTO_POR_CONTACTAR) {
      marker.icon = "assets/images/inactivoL.png";
    } else if (informacionCliente.prospectoE.etapa == this.appContants.ETAPA_PROSPECTO_CONTACTADO) {
      marker.icon = "assets/images/activoL.png";
    } else if (informacionCliente.prospectoE.etapa == this.appContants.ETAPA_PROSPECTO_SOLICITUD) {
      marker.icon = "assets/images/sinasignarL.png";
    } else {
      marker.icon = "assets/images/sinasignarL.png";
    }

    return marker;
  }

  showInfoWindow({ target: marker }, mr: Marker) {

    //this.activeMarker.lat = marker.getPosition().lat();
    //this.activeMarker.lng = marker.getPosition().lng();
    this.activeMarker.noAsignacion = mr.title;
    this.activeMarker.asignacion = mr.informacionCliente;
    this.activeMarker.nombre = mr.informacionCliente.noCedula;

    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  hideMarkerInfo() {
    this.activeMarker.display = !this.activeMarker.display;
  }

  public cardLead(informacionCliente: InformacionCliente) {
    this.navCtrl.push(EditCardLeadPage, { 'informacionCliente': informacionCliente });
  }

  public solicitud(informacionCliente: InformacionCliente) {
    this.navCtrl.push(SolicitudPage, { 'informacionCliente': informacionCliente });
  }

}
