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
export class ServicioMovilProvider {

  URL_INSERT_SERVICIO_MOVIL: string = "servicioMovil/insert";
  URL_INSERT_AUTORIZACION: string = "servicioMovil/autorizacionEnvioInformacion";
  URL_INSERT_ANEXOS_INFO: string = "servicioMovil/anexosInfo";

  constructor(public http: HttpClient, public appContants: AppContants) {
    console.log('ServicioMovilProvider');
    console.log('---------------------------------------------------');
  }

  public saveAnexosServMovilFirma(informacionCliente:InformacionCliente){

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_ANEXOS_INFO}`;

    const httpParams = new HttpParams()
    .append("idCliente", informacionCliente.idCliente.toString())
    .append("lugarRegistro", informacionCliente.servicioMovil.lugarRegistro)
    .append("firmaVendedorCodVendedor", informacionCliente.servicioMovil.firmaVendedorCodVendedor)
    .append("firmaClienteNoCedula", informacionCliente.servicioMovil.firmaClienteNoCedula)
    .append("firmaVendedorNombreApellido", informacionCliente.servicioMovil.firmaVendedorNombreApellido)
    .append("firmaClienteNombreApellido", informacionCliente.servicioMovil.firmaClienteNombreApellido);

    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, this.appContants.createHttpParams(httpParams), { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

  public saveAutorizacionEnvioInformacion(informacionCliente:InformacionCliente){

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_AUTORIZACION}`;

    let autorizacionEnvioFacturasElectronicas:boolean = informacionCliente.servicioMovil.autorizacionEnvioFacturasElectronicas;
    autorizacionEnvioFacturasElectronicas = autorizacionEnvioFacturasElectronicas == undefined ? false : autorizacionEnvioFacturasElectronicas;

    let autorizacionEnvioInformacionComercial:boolean = informacionCliente.servicioMovil.autorizacionEnvioInformacionComercial;
    autorizacionEnvioInformacionComercial = autorizacionEnvioInformacionComercial == undefined ? false : autorizacionEnvioInformacionComercial;

    const httpParams = new HttpParams()
    .append("idCliente", informacionCliente.idCliente.toString())
    .append("autorizacionEnvioInformacionComercial", autorizacionEnvioInformacionComercial.toString())
    .append("autorizacionEnvioFacturasElectronicas", autorizacionEnvioFacturasElectronicas.toString());

    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, this.appContants.createHttpParams(httpParams), { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

  public saveServicioMovilContratado(idCliente: number, servicioMovilContratado: ServicioMovilContratado) {

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_SERVICIO_MOVIL}`;

    let saldoPagar: number = servicioMovilContratado.saldoPagar;
    saldoPagar = saldoPagar == undefined ? 0 : saldoPagar;
    let valorFinanciamiento: number = servicioMovilContratado.valorFinanciamiento;
    valorFinanciamiento = valorFinanciamiento == undefined ? 0 : valorFinanciamiento;
    let valorPlan: number = servicioMovilContratado.valorPlan;
    valorPlan = valorPlan == undefined ? 0 : valorPlan;

    let aplicacionIncluida1: boolean = servicioMovilContratado.aplicacionIncluida1;
    aplicacionIncluida1 = aplicacionIncluida1 == undefined ? false : aplicacionIncluida1;
    let aplicacionIncluida2: boolean = servicioMovilContratado.aplicacionIncluida2;
    aplicacionIncluida2 = aplicacionIncluida2 == undefined ? false : aplicacionIncluida2;
    let aplicacionIncluida3: boolean = servicioMovilContratado.aplicacionIncluida3;
    aplicacionIncluida3 = aplicacionIncluida3 == undefined ? false : aplicacionIncluida3;

    let bonoPromocionalGigas: boolean = servicioMovilContratado.bonoPromocionalGigas;
    bonoPromocionalGigas = bonoPromocionalGigas == undefined ? false : bonoPromocionalGigas;
    let bonoPromocionalLlamadas: boolean = servicioMovilContratado.bonoPromocionalLlamadas;
    bonoPromocionalLlamadas = bonoPromocionalLlamadas == undefined ? false : bonoPromocionalLlamadas;

    let equipoIncluido: boolean = servicioMovilContratado.equipoIncluido;
    equipoIncluido = equipoIncluido == undefined ? false : equipoIncluido;

    let meses: number = servicioMovilContratado.meses;
    meses = meses == undefined ? 0 : meses;

    let numeroServicio: number = servicioMovilContratado.numeroServicio;
    numeroServicio = numeroServicio == undefined ? 0 : numeroServicio;

    let paqueteAdicional1: boolean = servicioMovilContratado.paqueteAdicional1;
    paqueteAdicional1 = paqueteAdicional1 == undefined ? false : paqueteAdicional1;
    let paqueteAdicional2: boolean = servicioMovilContratado.paqueteAdicional2;
    paqueteAdicional2 = paqueteAdicional2 == undefined ? false : paqueteAdicional2;
    let paqueteAdicional3: boolean = servicioMovilContratado.paqueteAdicional3;
    paqueteAdicional3 = paqueteAdicional3 == undefined ? false : paqueteAdicional3;

    let planContratadoGigas: number = servicioMovilContratado.planContratadoGigas;
    planContratadoGigas = planContratadoGigas == undefined ? 0 : planContratadoGigas;
    let planContratadoMin: number = servicioMovilContratado.planContratadoMin;
    planContratadoMin = planContratadoMin == undefined ? 0 : planContratadoMin;
    let planContratadoSms: number = servicioMovilContratado.planContratadoSms;
    planContratadoSms = planContratadoSms == undefined ? 0 : planContratadoSms;

    let redSocialLibre1: boolean = servicioMovilContratado.redSocialLibre1;
    redSocialLibre1 = redSocialLibre1 == undefined ? false : redSocialLibre1;
    let redSocialLibre2: boolean = servicioMovilContratado.redSocialLibre2;
    redSocialLibre2 = redSocialLibre2 == undefined ? false : redSocialLibre2;
    let redSocialLibre3: boolean = servicioMovilContratado.redSocialLibre3;
    redSocialLibre3 = redSocialLibre3 == undefined ? false : redSocialLibre3;
    let redSocialLibre4: boolean = servicioMovilContratado.redSocialLibre4;
    redSocialLibre4 = redSocialLibre4 == undefined ? false : redSocialLibre4;
    let redSocialLibre5: boolean = servicioMovilContratado.redSocialLibre5;
    redSocialLibre5 = redSocialLibre5 == undefined ? false : redSocialLibre5;

    const httpParams = new HttpParams()
      .append("idCliente", idCliente.toString())
      .append("aplicacionIncluida1", aplicacionIncluida1.toString())
      .append("aplicacionIncluida2", aplicacionIncluida2.toString())
      .append("aplicacionIncluida3", aplicacionIncluida3.toString())
      .append("bonoPromocionalGigas", bonoPromocionalGigas.toString())
      .append("bonoPromocionalLlamadas", bonoPromocionalLlamadas.toString())
      .append("bonoVigencia", servicioMovilContratado.bonoVigencia)
      .append("equipoIncluido", equipoIncluido.toString())
      .append("iccidImsi", servicioMovilContratado.iccidImsi)
      .append("imei", servicioMovilContratado.imei)
      .append("marcaModelo", servicioMovilContratado.marcaModelo)
      .append("meses", meses.toString())
      .append("numeroServicio", numeroServicio.toString())
      .append("numeroFavorito1", servicioMovilContratado.numeroFavorito1)
      .append("numeroFavorito2", servicioMovilContratado.numeroFavorito2)
      .append("numeroFavorito3", servicioMovilContratado.numeroFavorito3)
      .append("paqueteAdicional1", paqueteAdicional1.toString())
      .append("paqueteAdicional2", paqueteAdicional2.toString())
      .append("paqueteAdicional3", paqueteAdicional3.toString())
      .append("planContratado", servicioMovilContratado.planContratado)
      .append("planContratadoGigas", planContratadoGigas.toString())
      .append("planContratadoMin", planContratadoMin.toString())
      .append("planContratadoSms", planContratadoSms.toString())
      .append("pvp", servicioMovilContratado.pvp)
      .append("redSocialLibre1", redSocialLibre1.toString())
      .append("redSocialLibre2", redSocialLibre2.toString())
      .append("redSocialLibre3", redSocialLibre3.toString())
      .append("redSocialLibre4", redSocialLibre4.toString())
      .append("redSocialLibre5", redSocialLibre5.toString())
      .append("saldoPagar", saldoPagar.toString())
      .append("valorFinanciamiento", valorFinanciamiento.toString())
      .append("valorPlan", valorPlan.toString());

    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, this.appContants.createHttpParams(httpParams), { headers: headers, responseType: "json" })
      .map((res: any) => { console.log(url + " : " + res); return res; });

  }

}
