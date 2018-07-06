import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asignacionesGridEstatus',
})
export class AsignacionesGridEstatusPipe implements PipeTransform {

  transform(value: string) {

    //console.log("AsignacionesGridEstatusPipe : " + value)

    if (value=="Para hoy"){
      return "btn-danger";
    } else if (value=="Stand by"){
      return "btn-warning";
    } else if (value=="Ganado"){
      return "btn-success";
    } else {
      return "btn-danger";
    }
  }
}
