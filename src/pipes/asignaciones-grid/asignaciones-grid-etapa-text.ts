import { Pipe, PipeTransform } from '@angular/core';
import { AppContants } from "../../providers/app.constants";

@Pipe({
  name: 'asignacionesGridEtapaText',
})
export class AsignacionesGridEtapaTextPipe implements PipeTransform {

  constructor(public appContants: AppContants) {
  }

  transform(value:number) {

    //console.log("AsignacionesGridEtapaTextPipe : " + value)

    if (value==this.appContants.ETAPA_PROSPECTO_POR_CONTACTAR){
      return "Por Contactar";
    } else if (value==this.appContants.ETAPA_PROSPECTO_CONTACTADO){
      return "Contactado";
    } else if (value==this.appContants.ETAPA_PROSPECTO_SOLICITUD){
      return "Solicitud";
    } else if (value==this.appContants.ETAPA_PROSPECTO_NEGOCIACION){
      return "Negociación";
    } else {
      return "Solicitud";
    }
  }
}
