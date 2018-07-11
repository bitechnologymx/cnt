import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SolicitudPage } from '../../../pages/solicitud/solicitud';
import { CardLeadPage } from '../../../pages/leads/cardLead';

import { Marker } from "../../../providers/interfaces/marker.interface";

import { ASIGNACIONES } from "../../../providers/data/data.asignaciones";
import { Asignacion } from "../../../providers/interfaces/asignacion.interface";

@Component({
  selector: 'map-asignaciones',
  templateUrl: 'map-asignaciones.html'
})
export class MapAsignacionesComponent {

    markers: Marker[] = [];
    asignaciones: Asignacion[] = [];

    activeMarker = {
      display: true,
      nombre: "",
      noAsignacion: "",
      asignacion: null,
      lat: null,
      lng: null,
    };

    constructor(public navCtrl: NavController) {
      this.asignaciones = ASIGNACIONES.slice(0);

      let randomLat: number, randomLng: number;
      this.markers = [];

      for( let asignacion of this.asignaciones ){
        let marker:Marker = this.getMarker(asignacion);
        console.log(marker);
        this.markers.push(marker);
      }
    }

    private getMarker(asignacion:Asignacion){

      let marker:Marker = {} as Marker;

      marker.title = asignacion.noAsignacion;
      marker.position = [asignacion.latitud,asignacion.longitud];
      marker.latitud = asignacion.latitud;
      marker.longitud = asignacion.longitud;

      marker.asignacion = asignacion;

      if (asignacion.etapa=="Por contactar"){
        marker.icon = "assets/images/inactivoL.png";
      } else if (asignacion.etapa=="Contactado"){
        marker.icon = "assets/images/activoL.png";
      } else if (asignacion.etapa=="Solicitud"){
        marker.icon = "assets/images/sinasignarL.png";
      } else {
        marker.icon = "assets/images/sinasignarL.png";
      }

      return marker;
    }

    showInfoWindow({target: marker}, mr:Marker) {

      //this.activeMarker.lat = marker.getPosition().lat();
      //this.activeMarker.lng = marker.getPosition().lng();
      this.activeMarker.noAsignacion = mr.title;
      this.activeMarker.asignacion = mr.asignacion;
      this.activeMarker.nombre = mr.asignacion.nombre;

      marker.nguiMapComponent.openInfoWindow('iw', marker);
    }

    hideMarkerInfo() {
      this.activeMarker.display = !this.activeMarker.display;
    }

    public cardLead(asignacion:Asignacion){
      this.navCtrl.push(CardLeadPage, {'asignacion':asignacion});
    }

    public solicitud(asignacion:Asignacion){
      this.navCtrl.push(SolicitudPage, {'asignacion':asignacion});
    }

}
