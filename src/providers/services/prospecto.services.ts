import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AppContants } from "../app.constants";
import { ServicesContants } from "../services.constants";
import { Prospecto } from "../interfaces/prospecto.interface";
import { ProspectoComentario } from "../interfaces/prospectoComentario.interface";
import { ProspectoEtapaHistorial } from "../interfaces/prospectoEtapaHistorial.interface";

@Injectable()
export class ProspectoProvider {

  private URL_PROSPECTO_COMENTARIOS_BY_ID_CLIENTE:string = "prospectoComentario/getByIdCliente";
  private URL_PROSPECTO_ETAPA_HISTORIAL_BY_ID_CLIENTE:string = "prospectoEtapaHistorial/getByIdCliente";
  private URL_UPDATE_PROSPECTO_SHORT_PROPERTY_BY_ID:string = "prospecto/updateShortPropertyById";
  private URL_UPDATE_PROSPECTO_STRING_PROPERTY_BY_ID:string = "prospecto/updateStringPropertyById";
  private URL_UPDATE_PROSPECTO_BOOLEAN_PROPERTY_BY_ID:string = "prospecto/updateBooleanPropertyById";
  private URL_INSERT_PROSPECTO_ETAPA_HISTORIAL:string = "prospectoEtapaHistorial/insert";
  private URL_INSERT_PROSPECTO_COMENTARIO:string = "prospectoComentario/insert";

  constructor(private http: HttpClient,private appContants: AppContants) {
    console.log('ProspectoProvider');
    console.log('---------------------------------------------------');
  }

  public getComentariosProspecto(idCliente:number){
    let url = `${this.appContants.SERVER_URL}${this.URL_PROSPECTO_COMENTARIOS_BY_ID_CLIENTE}`;
    const httpParams = new HttpParams().append("idCliente",idCliente.toString());
    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( (res:any) => {
      console.log("ProspectoProvider getComentariosProspecto: ");console.log(res);
      let comentarios:any = ServicesContants.transformResponseProspectoComentarios(res);
      return comentarios;
    });
  }

  public getEstatusEtapaProspecto(idCliente:number){
    let url = `${this.appContants.SERVER_URL}${this.URL_PROSPECTO_ETAPA_HISTORIAL_BY_ID_CLIENTE}`;
    const httpParams = new HttpParams().append("idCliente",idCliente.toString());
    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( (res:any) => {
      console.log("ProspectoProvider getEstatusEtapaProspecto: ");console.log(res);
      let estatusHistorial:any = ServicesContants.transformResponseProspectoEstatusHistorial(res);
      return estatusHistorial;
    });
  }

  public saveProspectoComentario(idCliente:number, comentario: string, idUsuario: number){

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_PROSPECTO_COMENTARIO}`;
    const httpParams = new HttpParams().append("idCliente",idCliente.toString()).append("comentario",comentario).append("idUsuario",idUsuario.toString());
    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

  public updateProspectoShortProperty(idCliente:number, property:string, value:any){

    let url = `${this.appContants.SERVER_URL}${this.URL_UPDATE_PROSPECTO_SHORT_PROPERTY_BY_ID}`;
    const httpParams = new HttpParams().append("idProspecto",idCliente.toString()).append("property",property).append("value",value);
    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

  public updateProspectoStringProperty(idCliente:number, property:string, value:any){

    let url = `${this.appContants.SERVER_URL}${this.URL_UPDATE_PROSPECTO_STRING_PROPERTY_BY_ID}`;
    const httpParams = new HttpParams().append("idProspecto",idCliente.toString()).append("property",property).append("value",value);
    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

  public updateProspectoBooleanProperty(idCliente:number, property:string, value:any){

    let url = `${this.appContants.SERVER_URL}${this.URL_UPDATE_PROSPECTO_BOOLEAN_PROPERTY_BY_ID}`;
    const httpParams = new HttpParams().append("idProspecto",idCliente.toString()).append("property",property).append("value",value);
    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

  public insertProspectoEtapaHistorial(idCliente:number, etapa:number){

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_PROSPECTO_ETAPA_HISTORIAL}`;
    const httpParams = new HttpParams().append("idCliente",idCliente.toString()).append("etapa",etapa.toString());
    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

}
