import { Pipe, PipeTransform } from '@angular/core';
import { AppContants } from "../../providers/app.constants";

@Pipe({
  name: 'asignacionesGridEstatusText',
})
export class AsignacionesGridEstatusTextPipe implements PipeTransform {

  constructor(public appContants: AppContants) {
  }

  transform(value:number) {

    //console.log("AsignacionesGridEstatusPipe : " + value)

    if (value==this.appContants.ESTATUS_USUARIO_ACTIVO){
      return "Para hoy";
    } else if (value==this.appContants.ESTATUS_USUARIO_STANDBY){
      return "Stand by";
    } else if (value==this.appContants.ESTATUS_USUARIO_GANADO){
      return "Ganado";
    } else if (value==this.appContants.ESTATUS_USUARIO_PERDIDO){
      return "Perdido";
    } else if (value==this.appContants.ESTATUS_USUARIO_CANCELADO){
      return "Cancelado";
    } else {
      return "Stand by";
    }
  }
}
