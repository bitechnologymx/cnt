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
export class ServicioFijoProvider {

  URL_INSERT_POLITICA_BUEN_USO: string = "servicioFijo/politicaBuenUso";
  URL_INSERT_AUTORIZACION: string = "servicioFijo/autorizacionEnvioInformacion";
  URL_INSERT_ANEXOS_INFO: string = "servicioFijo/anexosInfo";

  constructor(public http: HttpClient, public appContants: AppContants) {
    console.log('ServicioFijoProvider');
    console.log('---------------------------------------------------');
  }

  public saveAnexosServFijoFirma(informacionCliente:InformacionCliente){

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_ANEXOS_INFO}`;

    const httpParams = new HttpParams()
    .append("idCliente", informacionCliente.idCliente.toString())
    .append("lugarRegistro", informacionCliente.servicioFijo.lugarRegistro)
    .append("firmaVendedorCodVendedor", informacionCliente.servicioFijo.firmaVendedorCodVendedor)
    .append("firmaClienteNoCedula", informacionCliente.servicioFijo.firmaClienteNoCedula)
    .append("firmaVendedorNombreApellido", informacionCliente.servicioFijo.firmaVendedorNombreApellido)
    .append("firmaClienteNombreApellido", informacionCliente.servicioFijo.firmaClienteNombreApellido);

    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, this.appContants.createHttpParams(httpParams), { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

  public saveAutorizacionEnvioInformacion(informacionCliente:InformacionCliente){

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_AUTORIZACION}`;

    let autorizacionEnvioFacturasElectronicas:boolean = informacionCliente.servicioFijo.autorizacionEnvioFacturasElectronicas;
    autorizacionEnvioFacturasElectronicas = autorizacionEnvioFacturasElectronicas == undefined ? false : autorizacionEnvioFacturasElectronicas;

    let autorizacionEnvioInformacionComercial:boolean = informacionCliente.servicioFijo.autorizacionEnvioInformacionComercial;
    autorizacionEnvioInformacionComercial = autorizacionEnvioInformacionComercial == undefined ? false : autorizacionEnvioInformacionComercial;

    const httpParams = new HttpParams()
    .append("idCliente", informacionCliente.idCliente.toString())
    .append("autorizacionEnvioInformacionComercial", autorizacionEnvioInformacionComercial.toString())
    .append("autorizacionEnvioFacturasElectronicas", autorizacionEnvioFacturasElectronicas.toString());

    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, this.appContants.createHttpParams(httpParams), { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

  public savePoliticaBuenUso(informacionCliente:InformacionCliente){

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_POLITICA_BUEN_USO}`;

    let politicaBuenUsoInternetFijo:boolean = informacionCliente.servicioFijo.politicaBuenUsoInternetFijo;
    politicaBuenUsoInternetFijo = politicaBuenUsoInternetFijo == undefined ? false : politicaBuenUsoInternetFijo;

    let politicaBuenUsoTelefoniaFija:boolean = informacionCliente.servicioFijo.politicaBuenUsoTelefoniaFija;
    politicaBuenUsoTelefoniaFija = politicaBuenUsoTelefoniaFija == undefined ? false : politicaBuenUsoTelefoniaFija;

    let politicaBuenUsoTelevisionSuscripcion:boolean = informacionCliente.servicioFijo.politicaBuenUsoTelevisionSuscripcion;
    politicaBuenUsoTelevisionSuscripcion = politicaBuenUsoTelevisionSuscripcion == undefined ? false : politicaBuenUsoTelevisionSuscripcion;

    const httpParams = new HttpParams()
    .append("idCliente", informacionCliente.idCliente.toString())
    .append("politicaBuenUsoInternetFijo", politicaBuenUsoInternetFijo.toString())
    .append("politicaBuenUsoTelefoniaFija", politicaBuenUsoTelefoniaFija.toString())
    .append("politicaBuenUsoTelevisionSuscripcion", politicaBuenUsoTelevisionSuscripcion.toString());

    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, this.appContants.createHttpParams(httpParams), { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

}
