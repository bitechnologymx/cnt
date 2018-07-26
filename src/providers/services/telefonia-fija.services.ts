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
export class TelefoniaFijaProvider {

  URL_INSERT_TEL_FIJA:string = "telefoniaFija/insert";

  constructor(public http: HttpClient,public appContants: AppContants) {
    console.log('TelefoniaFijaProvider');
    console.log('---------------------------------------------------');
  }

  public saveTelefoniaFija(informacionCliente:InformacionCliente){

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_TEL_FIJA}`;

    //centralInstalacion,descuento,distribInstalacion,noLineas,noPeticion,noReferenciaInstalacion,otroTipoTecnologia,otroValorInscripcion
    //pensionBasicaPorLinea,tipoPlanContratado,tipoTecnologia,valorInscripcion

    let noLineas:number = informacionCliente.servicioFijo.telefoniaFija.noLineas;
    noLineas = noLineas == undefined ? 0 : noLineas;

    let noPeticion:number = informacionCliente.servicioFijo.telefoniaFija.noPeticion;
    noPeticion = noPeticion == undefined ? 0 : noPeticion;

    let pensionBasicaPorLinea:number = informacionCliente.servicioFijo.telefoniaFija.pensionBasicaPorLinea;
    pensionBasicaPorLinea = pensionBasicaPorLinea == undefined ? 0 : pensionBasicaPorLinea;

    const httpParams = new HttpParams()
    .append("idCliente",informacionCliente.idCliente.toString())
    .append("centralInstalacion",informacionCliente.servicioFijo.telefoniaFija.centralInstalacion)
    .append("descuento",informacionCliente.servicioFijo.telefoniaFija.descuento)
    .append("distribInstalacion",informacionCliente.servicioFijo.telefoniaFija.distribInstalacion)
    .append("noLineas", noLineas.toString())
    .append("noPeticion",noPeticion.toString())
    .append("noReferenciaInstalacion",informacionCliente.servicioFijo.telefoniaFija.noReferenciaInstalacion)
    .append("otroTipoTecnologia",informacionCliente.servicioFijo.telefoniaFija.otroTipoTecnologia)
    .append("otroValorInscripcion",informacionCliente.servicioFijo.telefoniaFija.otroValorInscripcion)
    .append("pensionBasicaPorLinea",pensionBasicaPorLinea.toString())
    .append("tipoPlanContratado",informacionCliente.servicioFijo.telefoniaFija.tipoPlanContratado)
    .append("otroTipoPlanContratado",informacionCliente.servicioFijo.telefoniaFija.otroTipoPlanContratado)
    .append("tipoTecnologia",informacionCliente.servicioFijo.telefoniaFija.tipoTecnologia)
    .append("valorInscripcion",informacionCliente.servicioFijo.telefoniaFija.valorInscripcion)
    .append("serieEquipo",informacionCliente.servicioFijo.telefoniaFija.serieEquipo);

    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, this.appContants.createHttpParams(httpParams), { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

}
