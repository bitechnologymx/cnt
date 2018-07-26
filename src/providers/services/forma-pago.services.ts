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
export class FormaPagoProvider {

  URL_INSERT_FORMA_PAGO:string = "formaPago/insert";
  URL_INSERT_AUTORIZACION_DEBITO:string = "formaPago/autorizacionDebito";

  constructor(public http: HttpClient,public appContants: AppContants) {
    console.log('FormaPagoProvider');
    console.log('---------------------------------------------------');
  }

  public saveAutorizacionDebito(informacionCliente:InformacionCliente){

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_AUTORIZACION_DEBITO}`;

    let autorizacionDebitoSF:boolean = informacionCliente.servicioFijo.autorizacionDebito;
    autorizacionDebitoSF = autorizacionDebitoSF == undefined ? false : autorizacionDebitoSF;

    let autorizacionDebitoSM:boolean = informacionCliente.servicioMovil.autorizacionDebito;
    autorizacionDebitoSM = autorizacionDebitoSM == undefined ? false : autorizacionDebitoSM;

    const httpParams = new HttpParams()
    .append("idCliente", informacionCliente.idCliente.toString())
    .append("autorizacionDebitoSF", autorizacionDebitoSF.toString())
    .append("autorizacionDebitoSM", autorizacionDebitoSM.toString());

    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, this.appContants.createHttpParams(httpParams), { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

  public saveFormaPago(informacionCliente:InformacionCliente, tipoServicio:string){

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_FORMA_PAGO}`;
    let formaPago:FormaPago = null;

    if (tipoServicio == this.appContants.FORMA_PAGO_INTERNET_FIJO){
      formaPago = informacionCliente.servicioFijo.internetFijo.formaPago;
    } else if (tipoServicio == this.appContants.FORMA_PAGO_TELEFONIA_FIJA){
      formaPago = informacionCliente.servicioFijo.telefoniaFija.formaPago;
    } else if (tipoServicio == this.appContants.FORMA_PAGO_TELEVISION_SUSCRIPCION){
      formaPago = informacionCliente.servicioFijo.televisionSuscripcion.formaPago;
    } else if (tipoServicio == this.appContants.FORMA_PAGO_SERVICIO_MOVIL){
      formaPago = informacionCliente.servicioMovil.formaPago;
    }

    let idFormaPago:number = formaPago.idFormaPago;
    idFormaPago = idFormaPago == undefined ? 0 : idFormaPago;

    let noCuenta:number = formaPago.noCuenta;
    noCuenta = noCuenta == undefined ? 0 : noCuenta;

    let noTarjetaCredito:number = formaPago.noTarjetaCredito;
    noTarjetaCredito = noTarjetaCredito == undefined ? 0 : noTarjetaCredito;

    const httpParams = new HttpParams()
    .append("idCliente", informacionCliente.idCliente.toString())
    .append("idFormaPago", idFormaPago.toString())
    .append("noContrato", formaPago.noContrato)
    .append("entidadFinanciera", formaPago.entidadFinanciera)
    .append("fechaExpiracion", formaPago.fechaExpiracion)
    .append("noCuenta", noCuenta.toString())
    .append("noTarjetaCredito", noTarjetaCredito.toString())
    .append("tipoCuenta", formaPago.tipoCuenta)
    .append("tipoServicio", tipoServicio)
    .append("tipoTarjetaEntidadFinanciera", formaPago.tipoTarjetaEntidadFinanciera)
    .append("ventanilla", formaPago.ventanilla)
    .append("ventanillaNoTelefonicoVirtual", formaPago.ventanillaNoTelefonicoVirtual);

    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, this.appContants.createHttpParams(httpParams), { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

}
