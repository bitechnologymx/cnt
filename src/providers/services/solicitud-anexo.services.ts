import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AppContants } from "../app.constants";
import { ServicesContants } from "../services.constants";
import { SolicitudAnexo } from "../interfaces/solicitudAnexo.interface";

@Injectable()
export class SolicitudAnexoProvider {

  private URL_INSERT_SOLICITUD_ANEXO: string = "solicitudAnexo/insert";
  private URL_SOLICITUDES_ANEXO_BY_ID_TIPO_SERVICIO: string = "solicitudAnexo/getAnexoByIdClienteTipoServicio";
  private URL_DELETE_SOLICITUD_ANEXO: string = "solicitudAnexo/delete";

  constructor(public http: HttpClient, public appContants: AppContants) {
    console.log('SolicitudAnexoProvider');
    console.log('---------------------------------------------------');
  }

  public solicitudesAnexo(idCliente, tipoServicio){
    let url = `${this.appContants.SERVER_URL}${this.URL_SOLICITUDES_ANEXO_BY_ID_TIPO_SERVICIO}`;
    const httpParams = new HttpParams().append("idCliente",idCliente).append("tipoServicio",tipoServicio);
    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( (res:any) => {
      console.log("solicitudesAnexo : ");console.log(res);

      let solicitudesAnexo:SolicitudAnexo[] = new Array<SolicitudAnexo>();

      res.forEach(function(data){
        let solAnexo:SolicitudAnexo = ServicesContants.transformResponseSolicitudAnexo(data);
        solicitudesAnexo.push(solAnexo);
      });

      return solicitudesAnexo;
    });
  }

  public deleteSolicitudAnexo(solicitudAnexo:SolicitudAnexo){

    let url = `${this.appContants.SERVER_URL}${this.URL_DELETE_SOLICITUD_ANEXO}`;

    const httpParams = new HttpParams()
    .append("idSolicitudAnexos", solicitudAnexo.idSolicitudAnexos.toString());

    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, this.appContants.createHttpParams(httpParams), { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

  public saveSolicitudAnexo(solicitudAnexo:SolicitudAnexo){

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_SOLICITUD_ANEXO}`;

    const httpParams = new HttpParams()
    .append("idCliente", solicitudAnexo.idCliente.toString())
    .append("tipoServicio", solicitudAnexo.tipoServicio)
    .append("nombreArchivo", solicitudAnexo.nombreArchivo)
    .append("archivo", solicitudAnexo.archivo)
    .append("urlArchivo", solicitudAnexo.urlArchivo);

    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, this.appContants.createHttpParams(httpParams), { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

}
