import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { Usuario } from "./interfaces/usuario.interface";

@Injectable()
export class AppContants{

  public SERVER_URL:string = "http://216.250.114.107:8080/cnt/services/";
  //public SERVER_URL:string = "http://localhost:18080/cnt/services/";

  public TIPO_SERVICIO_FIJO:string = "servicioFijo";
	public TIPO_SERVICIO_MOVIL:string = "servicioMovil";

  public ROLE_ADMIN:number = 1;
  public ROLE_SUPERVISOR:number = 2;
  public ROLE_VENDEDOR:number = 3;

  public ESTATUS_USUARIO_ACTIVO:number = 1;
  public ESTATUS_USUARIO_STANDBY:number = 2;
  public ESTATUS_USUARIO_GANADO:number = 3;
  public ESTATUS_USUARIO_PERDIDO:number = 4;
  public ESTATUS_USUARIO_CANCELADO:number = 5;

  public ETAPA_PROSPECTO_POR_CONTACTAR:number = 1;
  public ETAPA_PROSPECTO_CONTACTADO:number = 2;
  public ETAPA_PROSPECTO_SOLICITUD:number = 3;
  public ETAPA_PROSPECTO_NEGOCIACION:number = 4;

  public FORMA_PAGO_TELEFONIA_FIJA:string = "telefoniaFija";
	public FORMA_PAGO_TELEVISION_SUSCRIPCION:string = "televisionSuscripcion";
	public FORMA_PAGO_INTERNET_FIJO:string = "internetFijo";
	public FORMA_PAGO_SERVICIO_MOVIL:string = "servicioMovil";

  public ACTIVE_USER:Usuario;

  public createHttpParams(httpParamsData:HttpParams) {

    let httpParams = new HttpParams();
    console.log("createHttpParams : " + httpParamsData);
    httpParamsData.keys().forEach(function (key) {
        //console.log(key + " : " + httpParamsData.get(key));
        httpParams = httpParams.append(key, httpParamsData.get(key) == null ? "" : httpParamsData.get(key));
    });
    return httpParams;
}

  public reqHeadersPost() : HttpHeaders {
    let headers = new HttpHeaders()
    .set("Content-Type", "application/x-www-form-urlencoded")
    //.set("Content-Length", "length")
    ;
    return headers;
  }

  public inspect(obj) {
    var msg = '';
    for ( var property in obj) {
      if (typeof obj[property] == 'function') {
        var inicio = obj[property].toString().indexOf('function');
        var fin = obj[property].toString().indexOf(')') + 1;
        var propertyValue = obj[property].toString().substring(inicio, fin);
        msg += (typeof obj[property]) + ' ' + property + ' : ' + propertyValue + ' ;\n';
      }else {
        msg += (typeof obj[property]) + ' ' + property + ' : ' + obj[property] + ' ;\n';
      }
    }
    console.log("Inspect : \n" + msg);
    return msg;
  }

}
