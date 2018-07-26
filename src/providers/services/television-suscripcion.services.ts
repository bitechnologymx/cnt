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
export class TelevisionSuscripcionProvider {

  URL_INSERT_TV_SUSCRIPCION:string = "televisionSuscripcion/insert";

  constructor(public http: HttpClient,public appContants: AppContants) {
    console.log('TelevisionSuscripcionProvider');
    console.log('---------------------------------------------------');
  }

  public saveTelevisionSuscripcion(informacionCliente:InformacionCliente){

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_TV_SUSCRIPCION}`;

    let noPeticion:number = informacionCliente.servicioFijo.televisionSuscripcion.noPeticion;
    noPeticion = noPeticion == undefined ? 0 : noPeticion;

    let cntDuoPack:boolean = informacionCliente.servicioFijo.televisionSuscripcion.cntDuoPack;
    cntDuoPack = cntDuoPack == undefined ? false : cntDuoPack;

    let cntTriplePack:boolean = informacionCliente.servicioFijo.televisionSuscripcion.cntTriplePack;
    cntTriplePack = cntTriplePack == undefined ? false : cntTriplePack;

    let decodificadorAdicionalInstalacion:number = informacionCliente.servicioFijo.televisionSuscripcion.decodificadorAdicionalInstalacion;
    decodificadorAdicionalInstalacion = decodificadorAdicionalInstalacion == undefined ? 0 : decodificadorAdicionalInstalacion;

    let decodificadorPrincipalInstalacion:number = informacionCliente.servicioFijo.televisionSuscripcion.decodificadorPrincipalInstalacion;
    decodificadorPrincipalInstalacion = decodificadorPrincipalInstalacion == undefined ? 0 : decodificadorPrincipalInstalacion;

    let decodificadoresAdicionalesPromo:number = informacionCliente.servicioFijo.televisionSuscripcion.decodificadoresAdicionalesPromo;
    decodificadoresAdicionalesPromo = decodificadoresAdicionalesPromo == undefined ? 0 : decodificadoresAdicionalesPromo;

    let decodificadoresAdicionalesTarifa:number = informacionCliente.servicioFijo.televisionSuscripcion.decodificadoresAdicionalesTarifa;
    decodificadoresAdicionalesTarifa = decodificadoresAdicionalesTarifa == undefined ? 0 : decodificadoresAdicionalesTarifa;

    let garantiaExtendidaInstalacion:number = informacionCliente.servicioFijo.televisionSuscripcion.garantiaExtendidaInstalacion;
    garantiaExtendidaInstalacion = garantiaExtendidaInstalacion == undefined ? 0 : garantiaExtendidaInstalacion;

    let pensionBasicaMensual:number = informacionCliente.servicioFijo.televisionSuscripcion.pensionBasicaMensual;
    pensionBasicaMensual = pensionBasicaMensual == undefined ? 0 : pensionBasicaMensual;

    let planContratado:number = informacionCliente.servicioFijo.televisionSuscripcion.planContratado;
    planContratado = planContratado == undefined ? 0 : planContratado;

    let promoInstalacion:number = informacionCliente.servicioFijo.televisionSuscripcion.promoInstalacion;
    promoInstalacion = promoInstalacion == undefined ? 0 : promoInstalacion;

    let decodificadorAdicionalSd:boolean = informacionCliente.servicioFijo.televisionSuscripcion.decodificadorAdicionalSd;
    decodificadorAdicionalSd = decodificadorAdicionalSd == undefined ? false : decodificadorAdicionalSd;

    let decodificadorAdicionalHd:boolean = informacionCliente.servicioFijo.televisionSuscripcion.decodificadorAdicionalHd;
    decodificadorAdicionalHd = decodificadorAdicionalHd == undefined ? false : decodificadorAdicionalHd;

    let decodificadorAdicionalZapper:boolean = informacionCliente.servicioFijo.televisionSuscripcion.decodificadorAdicionalZapper;
    decodificadorAdicionalZapper = decodificadorAdicionalZapper == undefined ? false : decodificadorAdicionalZapper;

    let decodificadorAdicionalOtros:boolean = informacionCliente.servicioFijo.televisionSuscripcion.decodificadorAdicionalOtros;
    decodificadorAdicionalOtros = decodificadorAdicionalOtros == undefined ? false : decodificadorAdicionalOtros;

    let planAdicionalTarifa1:number = informacionCliente.servicioFijo.televisionSuscripcion.planAdicionalTarifa1;
    planAdicionalTarifa1 = planAdicionalTarifa1 == undefined ? 0 : planAdicionalTarifa1;

    let planAdicionalTarifa2:number = informacionCliente.servicioFijo.televisionSuscripcion.planAdicionalTarifa2;
    planAdicionalTarifa2 = planAdicionalTarifa2 == undefined ? 0 : planAdicionalTarifa2;

    let planAdicionalTarifa3:number = informacionCliente.servicioFijo.televisionSuscripcion.planAdicionalTarifa3;
    planAdicionalTarifa3 = planAdicionalTarifa3 == undefined ? 0 : planAdicionalTarifa3;

    let planAdicionalTarifa4:number = informacionCliente.servicioFijo.televisionSuscripcion.planAdicionalTarifa4;
    planAdicionalTarifa4 = planAdicionalTarifa4 == undefined ? 0 : planAdicionalTarifa4;

    let planAdicionalTarifa5:number = informacionCliente.servicioFijo.televisionSuscripcion.planAdicionalTarifa5;
    planAdicionalTarifa5 = planAdicionalTarifa5 == undefined ? 0 : planAdicionalTarifa5;

    const httpParams = new HttpParams()
    .append("idCliente",informacionCliente.idCliente.toString())
    .append("noContratoTelevision",informacionCliente.servicioFijo.televisionSuscripcion.noContratoTelevision)
    .append("noPeticion",noPeticion.toString())
    .append("cntDuoPack",cntDuoPack.toString())
    .append("cntTriplePack",cntTriplePack.toString())
    .append("decodificadorAdicionalInstalacion",decodificadorAdicionalInstalacion.toString())
    .append("decodificadorPrincipalInstalacion",decodificadorPrincipalInstalacion.toString())
    .append("decodificadoresAdicionalesPromo",decodificadoresAdicionalesPromo.toString())
    .append("decodificadoresAdicionalesTarifa",decodificadoresAdicionalesTarifa.toString())
    .append("garantiaExtendidaInstalacion",garantiaExtendidaInstalacion.toString())
    .append("noFacturar",informacionCliente.servicioFijo.televisionSuscripcion.noFacturar)
    .append("pensionBasicaMensual",pensionBasicaMensual.toString())
    .append("planContratado",planContratado.toString())
    .append("promoDetalleInstalacion",informacionCliente.servicioFijo.televisionSuscripcion.promoDetalleInstalacion)
    .append("promoInstalacion",promoInstalacion.toString())
    .append("tipoTecnologia",informacionCliente.servicioFijo.televisionSuscripcion.tipoTecnologia)
    .append("decodificadorAdicionalSd",decodificadorAdicionalSd.toString())
    .append("decodificadorAdicionalHd",decodificadorAdicionalHd.toString())
    .append("decodificadorAdicionalZapper",decodificadorAdicionalZapper.toString())
    .append("decodificadorAdicionalOtros",decodificadorAdicionalOtros.toString())
    .append("noDecodificadorAdicionalSd",informacionCliente.servicioFijo.televisionSuscripcion.noDecodificadorAdicionalSd)
    .append("noDecodificadorAdicionalHd",informacionCliente.servicioFijo.televisionSuscripcion.noDecodificadorAdicionalHd)
    .append("noDecodificadorAdicionalZapper",informacionCliente.servicioFijo.televisionSuscripcion.noDecodificadorAdicionalZapper)
    .append("noDecodificadorAdicionalOtros",informacionCliente.servicioFijo.televisionSuscripcion.noDecodificadorAdicionalOtros)
    .append("planAdicionalDesc1",informacionCliente.servicioFijo.televisionSuscripcion.planAdicionalDesc1)
    .append("planAdicionalDesc2",informacionCliente.servicioFijo.televisionSuscripcion.planAdicionalDesc2)
    .append("planAdicionalDesc3",informacionCliente.servicioFijo.televisionSuscripcion.planAdicionalDesc3)
    .append("planAdicionalDesc4",informacionCliente.servicioFijo.televisionSuscripcion.planAdicionalDesc4)
    .append("planAdicionalDesc5",informacionCliente.servicioFijo.televisionSuscripcion.planAdicionalDesc5)
    .append("planAdicionalTarifa1",planAdicionalTarifa1.toString())
    .append("planAdicionalTarifa2",planAdicionalTarifa2.toString())
    .append("planAdicionalTarifa3",planAdicionalTarifa3.toString())
    .append("planAdicionalTarifa4",planAdicionalTarifa4.toString())
    .append("planAdicionalTarifa5",planAdicionalTarifa5.toString());

    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, this.appContants.createHttpParams(httpParams), { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

}
