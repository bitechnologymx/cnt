import { Pipe, PipeTransform } from '@angular/core';

import { AppContants } from "../../providers/app.constants";

@Pipe({
  name: 'trim',
})
export class TrimTextPipe implements PipeTransform {

  constructor(public appContants: AppContants) { }

  transform(value: string) {
    console.log("TrimTextPipe : " + value)
    return value==undefined ? value : value.trim();
  }
}
