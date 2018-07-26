import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'asignacionesGridRandomColor',
  pure: false
})
export class AsignacionesGridRandomColorPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string) {

    console.log("AsignacionesGridRandomColorPipe : " + value)

    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    //return color;
    return this.sanitizer.bypassSecurityTrustHtml(color);
  }
}
