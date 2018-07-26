import { Pipe, PipeTransform } from '@angular/core';

import { AppContants } from "../../providers/app.constants";

@Pipe({
  name: 'actividadUsuario',
})
export class ActividadUsuarioPipe implements PipeTransform {

  constructor(public appContants: AppContants) { }

  transform(value: number) {

    //console.log("AsignacionesGridEstatusPipe : " + value)

    if (value==this.appContants.ESTATUS_USUARIO_ACTIVO){
      return "online";
    } else if (value==this.appContants.ESTATUS_USUARIO_STANDBY){
      return "online";
    } else if (value==this.appContants.ESTATUS_USUARIO_GANADO){
      return "away";
    } else if (value==this.appContants.ESTATUS_USUARIO_PERDIDO){
      return "no-disturb";
    } else if (value==this.appContants.ESTATUS_USUARIO_CANCELADO){
      return "no-disturb";
    } else {
      return "online";
    }

  }
}
