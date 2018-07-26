import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { saveAs } from 'file-saver/FileSaver';
import { Response } from '@angular/http';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { InterceptorService } from 'ng2-interceptors';

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
export class InformacionClientesProvider {

  URL_INFORMACION_CLIENTES_BY_VENDEDOR:string = "informacionCliente/getByVendedor";
  URL_INSERT_BLANK_CLIENTE:string = "informacionCliente/insertBlank";
  URL_DELETE_CLIENTE_ALL:string = "informacionCliente/deleteAll";
  URL_INSERT_LEAD:string = "informacionCliente/insertLead";
  URL_INSERT_INFO_CLIENTE:string = "informacionCliente/insertInformacionCliente";
  URL_EXPORT_INFO_CLIENTE:string = "informacionCliente/pdf";

  constructor(public http: HttpClient,public appContants: AppContants) {
    console.log('InformacionClientesProvider');
    console.log('---------------------------------------------------');
  }

  public exportSolicitud(informacionCliente:InformacionCliente): Observable<Blob>{

    let url = `${this.appContants.SERVER_URL}${this.URL_EXPORT_INFO_CLIENTE}`;

    let httpParams = new HttpParams()
    .append("idCliente",ServicesContants.reportTransformNumberData(informacionCliente.idCliente))
    .append("nombreCompletoCliente",ServicesContants.reportTransformStringData(informacionCliente.nombreApellidosRazonSocial))
    .append("noCedulaRuc",ServicesContants.reportTransformStringData(informacionCliente.noCedula))
    .append("telefonoContacto",ServicesContants.reportTransformStringData(informacionCliente.telefonoContacto))
    .append("telefonoMovil",ServicesContants.reportTransformStringData(informacionCliente.telefonoReferenciaPersonal))
    .append("correoElectronico",ServicesContants.reportTransformStringData(informacionCliente.email))
    .append("nombreRepresentanteLegal",ServicesContants.reportTransformStringData(informacionCliente.nombreRepresentanteLegal))
    .append("cedulaRepresentanteLegal",ServicesContants.reportTransformStringData(informacionCliente.cedulaRepresentanteLegal));

    if (informacionCliente.direccionCliente != null){
      httpParams = httpParams.append("callePrincipal",ServicesContants.reportTransformStringData(informacionCliente.direccionCliente.callePrincipal))
      .append("calleNo",ServicesContants.reportTransformStringData(informacionCliente.direccionCliente.numero))
      .append("calleSecundaria",ServicesContants.reportTransformStringData(informacionCliente.direccionCliente.calleSecundaria))
      .append("provincia",ServicesContants.reportTransformStringData(informacionCliente.direccionCliente.provincia))
      .append("ciudad",ServicesContants.reportTransformStringData(informacionCliente.direccionCliente.ciudad))
      .append("sector",ServicesContants.reportTransformStringData(informacionCliente.direccionCliente.sector))
      .append("latitud",ServicesContants.reportTransformStringData(informacionCliente.direccionCliente.latitud))
      .append("longitud",ServicesContants.reportTransformStringData(informacionCliente.direccionCliente.longitud));
    }

    if (informacionCliente.servicioFijo != null){
      httpParams = httpParams.append("internetFijo","")
      .append("buenUsoTelevisionSuscripcion",ServicesContants.reportTransformBooleanData(informacionCliente.servicioFijo.politicaBuenUsoTelevisionSuscripcion))
      .append("buenUsoTelefoniaFija",ServicesContants.reportTransformBooleanData(informacionCliente.servicioFijo.politicaBuenUsoTelefoniaFija))
      .append("autorizacionCorreoSF",ServicesContants.reportTransformBooleanData(informacionCliente.servicioFijo.autorizacionEnvioFacturasElectronicas))
      .append("autorizacionInformacionSF",ServicesContants.reportTransformBooleanData(informacionCliente.servicioFijo.autorizacionEnvioInformacionComercial))
      .append("firmaNombreVendedorSF",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.firmaVendedorNombreApellido))
      .append("firmaNoCedulaSF",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.firmaClienteNoCedula))
      .append("firmaNombreClienteSF",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.firmaClienteNombreApellido))
      .append("firmaCodigoSF",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.firmaVendedorCodVendedor));
    }

    if (informacionCliente.servicioMovil != null){
      httpParams = httpParams.append("firmaNombreVendedorSM",ServicesContants.reportTransformStringData(informacionCliente.servicioMovil.firmaVendedorNombreApellido))
      .append("firmaNoCedulaSM",ServicesContants.reportTransformStringData(informacionCliente.servicioMovil.firmaClienteNoCedula))
      .append("firmaCodigoSM",ServicesContants.reportTransformStringData(informacionCliente.servicioMovil.firmaClienteNoCedula))
      .append("autorizacionCorreoSM",ServicesContants.reportTransformBooleanData(informacionCliente.servicioMovil.autorizacionEnvioFacturasElectronicas))
      .append("autorizacionInformacionSM",ServicesContants.reportTransformBooleanData(informacionCliente.servicioMovil.autorizacionEnvioInformacionComercial))
      .append("firmaNombreClienteSM",ServicesContants.reportTransformStringData(informacionCliente.servicioMovil.firmaClienteNombreApellido));
    }

    if (informacionCliente.servicioFijo.telefoniaFija != null){
      httpParams = httpParams.append("noPeticionTelefoniaFija",ServicesContants.reportTransformNumberData(informacionCliente.servicioFijo.telefoniaFija.noPeticion))
      .append("planContratadoTelefoniaFija",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.telefoniaFija.tipoPlanContratado))
      .append("noLineasTelefoniaFija",ServicesContants.reportTransformNumberData(informacionCliente.servicioFijo.telefoniaFija.noLineas))
      .append("pensonBasicaTelefoniaFija",ServicesContants.reportTransformNumberData(informacionCliente.servicioFijo.telefoniaFija.pensionBasicaPorLinea))
      .append("descuentoTelefoniaFija",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.telefoniaFija.descuento))
      .append("noSerieEquipoTelefoniaFija",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.telefoniaFija.serieEquipo))
      .append("valorInscripcionTelefoniaFija",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.telefoniaFija.otroValorInscripcion))
      .append("valorTelefoniaFija",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.telefoniaFija.valorInscripcion))
      .append("noReferenciaTelefoniaFija",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.telefoniaFija.noReferenciaInstalacion))
      .append("centralTelefoniaFija",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.telefoniaFija.centralInstalacion))
      .append("tipoTecnologiaTelefoniaFija",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.telefoniaFija.tipoTecnologia))
      .append("distribucionTelefoniaFija",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.telefoniaFija.distribInstalacion));
    }

    if (informacionCliente.servicioFijo.internetFijo != null){
      httpParams = httpParams.append("noPeticionInternetFijo",ServicesContants.reportTransformNumberData(informacionCliente.servicioFijo.internetFijo.noPeticion))
      .append("noContratoInternetFijo",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.internetFijo.noContratoInternet))
      .append("planContratadoInternetFijo",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.internetFijo.planContratado))
      .append("pensionBasicaInternetFijo",ServicesContants.reportTransformNumberData(informacionCliente.servicioFijo.internetFijo.pensionBasicaMensual))
      .append("descuentoInternetFijo",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.internetFijo.descuento))
      .append("tipoTecnologiaInternetFijo",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.internetFijo.tipoTecnologia))
      .append("noFacturarInternetFijo",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.internetFijo.noFacturar))
      .append("valorInscripcionTextoInternetFijo",ServicesContants.reportTransformStringData(informacionCliente.servicioFijo.internetFijo.tipoValorInscripcion))
      .append("valorInscripcionValorInternetFijo",ServicesContants.reportTransformNumberData(informacionCliente.servicioFijo.internetFijo.valorInscripcion));
    }

    if (informacionCliente.servicioMovil.servicioMovilContratado.length > 0){
      httpParams = httpParams.append("planServicioMovilContratado",ServicesContants.reportTransformStringData(informacionCliente.servicioMovil.servicioMovilContratado[0].planContratado))
      .append("minutosServicioMovilContratado",ServicesContants.reportTransformNumberData(informacionCliente.servicioMovil.servicioMovilContratado[0].planContratadoMin))
      .append("gigasServicioMovilContratado",ServicesContants.reportTransformNumberData(informacionCliente.servicioMovil.servicioMovilContratado[0].planContratadoGigas))
      .append("smsServicioMovilContratado",ServicesContants.reportTransformNumberData(informacionCliente.servicioMovil.servicioMovilContratado[0].planContratadoSms))
      .append("bonoPromocionalServicioMovilContratado",ServicesContants.reportTransformBooleanData(informacionCliente.servicioMovil.servicioMovilContratado[0].bonoPromocionalLlamadas))
      .append("vigenciaBonoServicioMovilContratado",ServicesContants.reportTransformStringData(informacionCliente.servicioMovil.servicioMovilContratado[0].bonoVigencia))
      .append("facebookServicioMovilContratado",ServicesContants.reportTransformBooleanData(informacionCliente.servicioMovil.servicioMovilContratado[0].redSocialLibre1))
      .append("instagramServicioMovilContratado",ServicesContants.reportTransformBooleanData(informacionCliente.servicioMovil.servicioMovilContratado[0].redSocialLibre2))
      .append("noFavorito1ServicioMovilContratado",ServicesContants.reportTransformStringData(informacionCliente.servicioMovil.servicioMovilContratado[0].numeroFavorito1))
      .append("noFavorito2ServicioMovilContratado",ServicesContants.reportTransformStringData(informacionCliente.servicioMovil.servicioMovilContratado[0].numeroFavorito2))
      .append("noFavorito3ServicioMovilContratado",ServicesContants.reportTransformStringData(informacionCliente.servicioMovil.servicioMovilContratado[0].numeroFavorito3))
      .append("equipoServicioMovilContratado",ServicesContants.reportTransformBooleanData(informacionCliente.servicioMovil.servicioMovilContratado[0].equipoIncluido))
      .append("marcaServicioMovilContratado",ServicesContants.reportTransformStringData(informacionCliente.servicioMovil.servicioMovilContratado[0].marcaModelo))
      .append("valorFinanciamientoServicioMovilContratado",ServicesContants.reportTransformNumberData(informacionCliente.servicioMovil.servicioMovilContratado[0].valorFinanciamiento))
      .append("saldoPagarServicioMovilContratado",ServicesContants.reportTransformNumberData(informacionCliente.servicioMovil.servicioMovilContratado[0].saldoPagar))
      .append("valorDolaresServicioMovilContratado",ServicesContants.reportTransformNumberData(informacionCliente.servicioMovil.servicioMovilContratado[0].valorPlan))
      .append("whatsappServicioMovilContratado",ServicesContants.reportTransformBooleanData(informacionCliente.servicioMovil.servicioMovilContratado[0].redSocialLibre3))
      .append("snapchatServicioMovilContratado",ServicesContants.reportTransformBooleanData(informacionCliente.servicioMovil.servicioMovilContratado[0].redSocialLibre4))
      .append("twitterServicioMovilContratado",ServicesContants.reportTransformBooleanData(informacionCliente.servicioMovil.servicioMovilContratado[0].redSocialLibre5));
    }

    const options = new RequestOptions({responseType: ResponseContentType.Blob });

    const headers = this.appContants.reqHeadersPost();

    // Process the file downloaded
    return this.http.post(url, httpParams, {
      responseType: "blob"
    });
  }

  public saveInformacionCliente(informacionCliente:InformacionCliente){

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_INFO_CLIENTE}`;

    //const httpParams = new HttpParams().append("data", JSON.stringify({ informacionCliente }));
    const httpParams = new HttpParams()
    .append("idCliente",informacionCliente.idCliente.toString())
    .append("nombreApellidosRazonSocial",informacionCliente.nombreApellidosRazonSocial)
    .append("noCedula",informacionCliente.noCedula)
    .append("fechaRegistro",informacionCliente.prospectoE.fechaRegistro)
    .append("telefonoContacto",informacionCliente.telefonoContacto)
    .append("telefonoReferenciaPersonal",informacionCliente.telefonoReferenciaPersonal)
    .append("nombreRepresentanteLegal",informacionCliente.nombreRepresentanteLegal)
    .append("cedulaRepresentanteLegal",informacionCliente.cedulaRepresentanteLegal)
    .append("email",informacionCliente.email)
    .append("callePrincipal",informacionCliente.direccionCliente.callePrincipal)
    .append("numero",informacionCliente.direccionCliente.numero)
    .append("calleSecundaria",informacionCliente.direccionCliente.calleSecundaria)
    .append("edificio",informacionCliente.direccionCliente.edificio)
    .append("piso",informacionCliente.direccionCliente.piso)
    .append("noDepartamento",informacionCliente.direccionCliente.noDepartamento)
    .append("ciudad",informacionCliente.direccionCliente.ciudad)
    .append("provincia",informacionCliente.direccionCliente.provincia)
    .append("sector",informacionCliente.direccionCliente.sector)
    .append("latitud",informacionCliente.direccionCliente.latitud)
    .append("longitud",informacionCliente.direccionCliente.longitud);

    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, this.appContants.createHttpParams(httpParams), { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

  public informacionClientes(idUsuario){
    let url = `${this.appContants.SERVER_URL}${this.URL_INFORMACION_CLIENTES_BY_VENDEDOR}`;
    const httpParams = new HttpParams().append("idUsuario",idUsuario);
    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( (res:any) => {
      console.log("InformacionClientes : ");console.log(res);

      let informacionClientes:InformacionCliente[] = new Array<InformacionCliente>();

      res.forEach(function(data){
        let informacionCliente:InformacionCliente = ServicesContants.transformResponseInformacionCliente(data);
        informacionClientes.push(informacionCliente);
      });

      return informacionClientes;
    });
  }

  public borrarAsignacion(idCliente:number){

    let url = `${this.appContants.SERVER_URL}${this.URL_DELETE_CLIENTE_ALL}`;

    const httpParams = new HttpParams().append("idCliente",idCliente.toString());
    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( (res:any) => {
      console.log(url + " : " + res); return res;
    });
  }

  public insertBlankCliente(){

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_BLANK_CLIENTE}`;

    const httpParams = new HttpParams()
    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( (res:any) => {
      console.log(url + " : " + res);
      let informacionCliente:InformacionCliente = ServicesContants.transformResponseInformacionCliente(res);
      return res;
    });
  }

  public saveLead(informacionCliente:InformacionCliente){

    let url = `${this.appContants.SERVER_URL}${this.URL_INSERT_LEAD}`;

    const httpParams = new HttpParams()
    .append("idCliente",informacionCliente.idCliente.toString())
    .append("comentario",informacionCliente.prospectoE.estatusComentario)
    .append("nombreApellidosRazonSocial",informacionCliente.nombreApellidosRazonSocial)
    .append("telefonoContacto",informacionCliente.telefonoContacto)
    .append("email",informacionCliente.email)
    .append("callePrincipal",informacionCliente.prospectoE.direccionProspecto.callePrincipal)
    .append("numero",informacionCliente.prospectoE.direccionProspecto.numero)
    .append("ciudad",informacionCliente.prospectoE.direccionProspecto.ciudad)
    .append("provincia",informacionCliente.prospectoE.direccionProspecto.provincia)
    .append("sector",informacionCliente.prospectoE.direccionProspecto.sector)
    .append("latitud",informacionCliente.prospectoE.direccionProspecto.latitud)
    .append("longitud",informacionCliente.prospectoE.direccionProspecto.longitud);

    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( (res:any) => { console.log(url + " : " + res); return res; });
  }

}
