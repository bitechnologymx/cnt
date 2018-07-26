import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'asignacionesGridFecha',
  pure: false
})
export class AsignacionesGridFechaPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string) {

    //console.log("AsignacionesGridEstatusPipe : " + value)

    if (value==null){
      return "";
    } else {
      var htmlFechaSplit = value.split(" ");
      var htmlFecha = htmlFechaSplit[0] + " " + htmlFechaSplit[1] + " " + htmlFechaSplit[2] + "<br/>" + htmlFechaSplit[3] + " " + htmlFechaSplit[4];

      return this.sanitizer.bypassSecurityTrustHtml(htmlFecha);
    }

  }
}
