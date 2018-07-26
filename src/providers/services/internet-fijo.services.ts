import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AppContants } from "../app.constants";
import { ServicesContants } from "../services.constants";
import { Usuario } from "../interfaces/usuario.interface";
import { InformacionCliente } from "../interfaces/informacionCliente.interface";
import { DireccionCliente } from "../interfaces/direccionCliente.interface";
import { Prospecto } from "../interfaces/prospecto.interface";
import { DireccionProspecto } from "../interfaces/direccionProspecto.interface";
import { ServicioFijo } from "../interfaces/servicioFijo.interface";
import { FormaPago } from "../interfaces/formaPago.interface";
import { InternetFijo } from "../interfaces/internetFijo.interface";
import { TelefoniaFija } from "../interfaces/telefoniaFija.interface";
import { TelevisionSuscripcion } from "../interfaces/televisionSuscripcion.interface";
import { ServicioMovil } from "../interfaces/servicioMovil.interface";
import { ServicioMovilContratado } from "../interfaces/servicioMovilContratado.interface";

@Injectable()
export class InternetFijoProvider {

  URL_INSERT_INTERNET_FIJO:string = "internetFijo/insert";

  constructor(public http: HttpClient,public appContants: AppContants) {
    console.log('TelefoniaFijaProvider');
    console.log('---------------------------------------------------');
  }

  public saveInternetFijo(informacionCliente:InformacionCliente){

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_INTERNET_FIJO}`;

    let pensionBasicaMensual:number = informacionCliente.servicioFijo.internetFijo.pensionBasicaMensual;
    pensionBasicaMensual = pensionBasicaMensual == undefined ? 0 : pensionBasicaMensual;

    let noPeticion:number = informacionCliente.servicioFijo.internetFijo.noPeticion;
    noPeticion = noPeticion == undefined ? 0 : noPeticion;

    let valorInscripcion:number = informacionCliente.servicioFijo.internetFijo.valorInscripcion;
    valorInscripcion = valorInscripcion == undefined ? 0 : valorInscripcion;

    const httpParams = new HttpParams()
    .append("idCliente",informacionCliente.idCliente.toString())
    .append("noContratoInternet",informacionCliente.servicioFijo.internetFijo.noContratoInternet)
    .append("noPeticion",noPeticion.toString())
    .append("planContratado",informacionCliente.servicioFijo.internetFijo.planContratado)
    .append("pensionBasicaMensual",pensionBasicaMensual.toString())
    .append("descuento",informacionCliente.servicioFijo.internetFijo.descuento)
    .append("tipoTecnologia",informacionCliente.servicioFijo.internetFijo.tipoTecnologia)
    .append("otroTipoTecnologia",informacionCliente.servicioFijo.internetFijo.otroTipoTecnologia)
    .append("noConexionReferencia",informacionCliente.servicioFijo.internetFijo.noConexionReferencia)
    .append("noFacturar",informacionCliente.servicioFijo.internetFijo.noFacturar)
    .append("tipoValorInscripcion",informacionCliente.servicioFijo.internetFijo.tipoValorInscripcion)
    .append("valorInscripcion",valorInscripcion.toString());

    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, this.appContants.createHttpParams(httpParams), { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

}
