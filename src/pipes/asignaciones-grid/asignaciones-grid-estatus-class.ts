import { Pipe, PipeTransform } from '@angular/core';
import { AppContants } from "../../providers/app.constants";

@Pipe({
  name: 'asignacionesGridEstatusClass',
})
export class AsignacionesGridEstatusClassPipe implements PipeTransform {

  constructor(public appContants: AppContants) {
  }

  transform(value:number) {

    //console.log("AsignacionesGridEstatusClassPipe : " + value)

    if (value==this.appContants.ESTATUS_USUARIO_ACTIVO){
      return "btn-primary";
    } else if (value==this.appContants.ESTATUS_USUARIO_STANDBY){
      return "btn-info";
    } else if (value==this.appContants.ESTATUS_USUARIO_GANADO){
      return "btn-success";
    } else if (value==this.appContants.ESTATUS_USUARIO_PERDIDO){
      return "btn-warning";
    } else if (value==this.appContants.ESTATUS_USUARIO_CANCELADO){
      return "btn-danger";
    } else {
      return "btn-info";
    }
  }
}
