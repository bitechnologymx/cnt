import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { AppContants } from "./app.constants";
import { Usuario } from "./interfaces/usuario.interface";
import { InformacionCliente } from "./interfaces/informacionCliente.interface";
import { DireccionCliente } from "./interfaces/direccionCliente.interface";
import { Prospecto } from "./interfaces/prospecto.interface";
import { ProspectoComentario } from "./interfaces/prospectoComentario.interface";
import { ProspectoEtapaHistorial } from "./interfaces/prospectoEtapaHistorial.interface";
import { DireccionProspecto } from "./interfaces/direccionProspecto.interface";
import { ServicioFijo } from "./interfaces/servicioFijo.interface";
import { FormaPago } from "./interfaces/formaPago.interface";
import { InternetFijo } from "./interfaces/internetFijo.interface";
import { TelefoniaFija } from "./interfaces/telefoniaFija.interface";
import { TelevisionSuscripcion } from "./interfaces/televisionSuscripcion.interface";
import { ServicioMovil } from "./interfaces/servicioMovil.interface";
import { ServicioMovilContratado } from "./interfaces/servicioMovilContratado.interface";
import { SolicitudAnexo } from "./interfaces/solicitudAnexo.interface";

@Injectable()
export class ServicesContants{

  public static reportTransformStringData(data:string){
    try{
      if (data==null){
        return "";
      }
      if (data==undefined){
        return "";
      }
    } catch (err){
      return "";
    }
    return data;
  }

  public static reportTransformNumberData(data:number){
    try{
      if (data==null){
        return "0";
      }
      if (data==undefined){
        return "0";
      }
    } catch (err){
      return "0";
    }
    return data.toString();
  }

  public static reportTransformBooleanData(data:boolean){
    try{
      if (data==null){
        return "No";
      }
      if (data==undefined){
        return "No";
      }
    } catch (err){
      return "No";
    }
    return data ? "Si" : "No";
  }

  public static transformResponseInformacionCliente(data){

    console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
    try {console.log(data.servicioMovil.formaPago);} catch (err){}

    // INFORMACION CLIENTE ...............................
    let informacionCliente:InformacionCliente = new InformacionCliente();
    informacionCliente.idCliente = data.idCliente;
    informacionCliente.cedulaRepresentanteLegal = data.cedulaRepresentanteLegal;
    informacionCliente.email = data.email;
    informacionCliente.noCedula = data.noCedula;
    informacionCliente.nombreApellidosRazonSocial = data.nombreApellidosRazonSocial;
    informacionCliente.nombreReferenciaPersonal = data.nombreReferenciaPersonal;
    informacionCliente.nombreRepresentanteLegal = data.nombreRepresentanteLegal;
    informacionCliente.prospecto = data.prospecto;
    informacionCliente.telefonoContacto = data.telefonoContacto;
    informacionCliente.telefonoReferenciaPersonal = data.telefonoReferenciaPersonal;

    // DIRECCION CLIENTE ...............................
    let direccionCliente:DireccionCliente = null;
    if (data.direccionCliente != null){
      direccionCliente = ServicesContants.transformDireccionCliente(data.direccionCliente);
    }
    informacionCliente.direccionCliente = direccionCliente;

    //PROSPECTO
    let prospectoE:Prospecto = null;
    if (data.prospectoE != null){
      prospectoE = ServicesContants.transformProspecto(data.prospectoE);

      //DIRECCION PROSPECTO
      let direccionProspecto:DireccionProspecto = null;
      if (data.prospectoE.direccionProspecto != null){
        direccionProspecto = ServicesContants.transformDireccionProspecto(data.prospectoE.direccionProspecto);
      }
      prospectoE.direccionProspecto = direccionProspecto;

      //ASIGNADO A
      let asignadoA:Usuario = null;
      if (data.prospectoE.asignadoA != null){
        asignadoA = ServicesContants.transformAsignado(data.prospectoE.asignadoA);
      }
      prospectoE.asignadoA = asignadoA;

      //ASIGNADO POR
      let asignadoPor:Usuario = null;
      if (data.prospectoE.asignadoPor != null){
        asignadoPor = ServicesContants.transformAsignado(data.prospectoE.asignadoPor);
      }
      prospectoE.asignadoPor = asignadoPor;

    }
    informacionCliente.prospectoE = prospectoE;

    // SERVICIO MOVIL ...............................
    let servicioMovil:ServicioMovil = null;
    if (data.servicioMovil != null){
      servicioMovil = ServicesContants.transformServicioMovil(data.servicioMovil);

      //FORMA PAGO
      let formaPago:FormaPago = null;
      if (data.servicioMovil.formaPago != null){
        console.log("////////////////////////////////////");
        formaPago = ServicesContants.transformFormaPago(data.servicioMovil.formaPago);
        console.log(formaPago);
      }
      servicioMovil.formaPago = formaPago;

      let servicioMovilContratado:ServicioMovilContratado[] = null;
      if (data.servicioMovil.servicioMovilContratado != null){
        servicioMovilContratado = ServicesContants.transformServiciosMovilContratados(data.servicioMovil.servicioMovilContratado);
      }
      servicioMovil.servicioMovilContratado = servicioMovilContratado;

    }
    informacionCliente.servicioMovil = servicioMovil;

    // SERVICIO FIJO ...............................
    let servicioFijo:ServicioFijo = null;
    if (data.servicioFijo != null){
      servicioFijo = ServicesContants.transformServicioFijo(data.servicioFijo);

      //INTERNET FIJO
      let internetFijo:InternetFijo = null;
      if (data.servicioFijo.internetFijo != null){
        internetFijo = ServicesContants.transformInternetFijo(data.servicioFijo.internetFijo);

        //FORMA PAGO
        let formaPago:FormaPago = null;
        if (data.servicioFijo.internetFijo.formaPago != null){
          formaPago = ServicesContants.transformFormaPago(data.servicioFijo.internetFijo.formaPago);
        }
        internetFijo.formaPago = formaPago;
      }
      servicioFijo.internetFijo = internetFijo;

      //TELEVISION SUSCRIPCION
      let televisionSuscripcion:TelevisionSuscripcion = null;
      if (data.servicioFijo.televisionSuscripcion != null){
        televisionSuscripcion = ServicesContants.transformTelevisionSuscripcion(data.servicioFijo.televisionSuscripcion);

        //FORMA PAGO
        let formaPago:FormaPago = null;
        if (data.servicioFijo.televisionSuscripcion.formaPago != null){
          formaPago = ServicesContants.transformFormaPago(data.servicioFijo.televisionSuscripcion.formaPago);
        }
        televisionSuscripcion.formaPago = formaPago;
      }
      servicioFijo.televisionSuscripcion = televisionSuscripcion;

      //TELEFONIA FIJA
      let telefoniaFija:TelefoniaFija = null;
      if (data.servicioFijo.telefoniaFija != null){

        telefoniaFija = ServicesContants.transformTelefoniaFija(data.servicioFijo.telefoniaFija);

        //FORMA PAGO
        let formaPago:FormaPago = null;
        if (data.servicioFijo.telefoniaFija.formaPago != null){
          formaPago = ServicesContants.transformFormaPago(data.servicioFijo.telefoniaFija.formaPago);
        }
        telefoniaFija.formaPago = formaPago;
      }
      servicioFijo.telefoniaFija = telefoniaFija;
    }
    informacionCliente.servicioFijo = servicioFijo;

    return informacionCliente;
  }

  public static transformResponseInformacionClientes(res){

    //console.log("transformResponseInformacionClientes........................................................ : ");console.log(res);

    let informacionClientes:InformacionCliente[] = new Array<InformacionCliente>();
    res.forEach(function(data)
    {

      // INFORMACION CLIENTE ...............................
      let informacionCliente:InformacionCliente = new InformacionCliente();
      informacionCliente.idCliente = data.idCliente;
      informacionCliente.cedulaRepresentanteLegal = data.cedulaRepresentanteLegal;
      informacionCliente.email = data.email;
      informacionCliente.noCedula = data.noCedula;
      informacionCliente.nombreApellidosRazonSocial = data.nombreApellidosRazonSocial;
      informacionCliente.nombreReferenciaPersonal = data.nombreReferenciaPersonal;
      informacionCliente.nombreRepresentanteLegal = data.nombreRepresentanteLegal;
      informacionCliente.prospecto = data.prospecto;
      informacionCliente.telefonoContacto = data.telefonoContacto;
      informacionCliente.telefonoReferenciaPersonal = data.telefonoReferenciaPersonal;

      // DIRECCION CLIENTE ...............................
      let direccionCliente:DireccionCliente = null;
      if (data.direccionCliente != null){
        direccionCliente = ServicesContants.transformDireccionCliente(data.direccionCliente);
      }
      informacionCliente.direccionCliente = direccionCliente;

      //PROSPECTO
      let prospectoE:Prospecto = null;
      if (data.prospectoE != null){
        prospectoE = ServicesContants.transformProspecto(data.prospectoE);

        //DIRECCION PROSPECTO
        let direccionProspecto:DireccionProspecto = null;
        if (data.prospectoE.direccionProspecto != null){
          direccionProspecto = ServicesContants.transformDireccionProspecto(data.prospectoE.direccionProspecto);
        }
        prospectoE.direccionProspecto = direccionProspecto;

        //ASIGNADO A
        let asignadoA:Usuario = null;
        if (data.prospectoE.asignadoA != null){
          asignadoA = ServicesContants.transformAsignado(data.prospectoE.asignadoA);
        }
        prospectoE.asignadoA = asignadoA;

        //ASIGNADO POR
        let asignadoPor:Usuario = null;
        if (data.prospectoE.asignadoPor != null){
          asignadoPor = ServicesContants.transformAsignado(data.prospectoE.asignadoPor);
        }
        prospectoE.asignadoPor = asignadoPor;

      }
      informacionCliente.prospectoE = prospectoE;

      // SERVICIO MOVIL ...............................
      let servicioMovil:ServicioMovil = null;
      if (data.servicioMovil != null){
        servicioMovil = ServicesContants.transformServicioMovil(data.servicioMovil);

        //FORMA PAGO
        let formaPago:FormaPago = null;
        if (data.servicioMovil.formaPago != null){
          formaPago = ServicesContants.transformFormaPago(data.servicioMovil.formaPago);
        }
        servicioMovil.formaPago = formaPago;

        let servicioMovilContratado:ServicioMovilContratado[] = null;
        if (data.servicioMovil.servicioMovilContratado != null){
          servicioMovilContratado = ServicesContants.transformServiciosMovilContratados(data.servicioMovil.servicioMovilContratado);
        }
        servicioMovil.servicioMovilContratado = servicioMovilContratado;

      }
      informacionCliente.servicioMovil = servicioMovil;

      // SERVICIO FIJO ...............................
      let servicioFijo:ServicioFijo = null;
      if (data.servicioFijo != null){
        servicioFijo = ServicesContants.transformServicioFijo(data.servicioFijo);

        //INTERNET FIJO
        let internetFijo:InternetFijo = null;
        if (data.servicioFijo.internetFijo != null){
          internetFijo = ServicesContants.transformInternetFijo(data.servicioFijo.internetFijo);

          //FORMA PAGO
          let formaPago:FormaPago = null;
          if (data.servicioFijo.internetFijo.formaPago != null){
            formaPago = ServicesContants.transformFormaPago(data.servicioFijo.internetFijo.formaPago);
          }
          internetFijo.formaPago = formaPago;
        }
        servicioFijo.internetFijo = internetFijo;

        //TELEVISION SUSCRIPCION
        let televisionSuscripcion:TelevisionSuscripcion = null;
        if (data.servicioFijo.televisionSuscripcion != null){
          televisionSuscripcion = ServicesContants.transformTelevisionSuscripcion(data.servicioFijo.televisionSuscripcion);

          //FORMA PAGO
          let formaPago:FormaPago = null;
          if (data.servicioFijo.televisionSuscripcion.formaPago != null){
            formaPago = ServicesContants.transformFormaPago(data.servicioFijo.televisionSuscripcion.formaPago);
          }
          televisionSuscripcion.formaPago = formaPago;
        }
        servicioFijo.televisionSuscripcion = televisionSuscripcion;

        //TELEFONIA FIJA
        let telefoniaFija:TelefoniaFija = null;
        if (data.servicioFijo.telefoniaFija != null){
          telefoniaFija = ServicesContants.transformTelefoniaFija(data.servicioFijo.telefoniaFija);

          //FORMA PAGO
          let formaPago:FormaPago = null;
          if (data.servicioFijo.telefoniaFija.formaPago != null){
            formaPago = ServicesContants.transformFormaPago(data.servicioFijo.telefoniaFija.formaPago);
          }
          telefoniaFija.formaPago = formaPago;
        }
        servicioFijo.telefoniaFija = telefoniaFija;
      }
      informacionCliente.servicioFijo = servicioFijo;

      informacionClientes.push(informacionCliente);
    });

    return informacionClientes;
  }

  public static transformResponseProspectoEstatusHistorial(res){

    //console.log("transformResponseProspectoEstatusHistorial " + res);
    let etapaHistorial:ProspectoEtapaHistorial[] = new Array<ProspectoEtapaHistorial>();
    res.forEach(function(data)
    {
      //console.log(data);
      let etapa:ProspectoEtapaHistorial = new ProspectoEtapaHistorial();

      etapa.idProspectoEtapaHistorial = data.idProspectoEtapaHistorial;
      etapa.idCliente = data.idCliente;
      etapa.etapa = data.etapa;
      etapa.fechaActualizacion = data.fechaActualizacion;

      etapaHistorial.push(etapa);
    });

    return etapaHistorial;
  }

  public static transformResponseSolicitudAnexo(res){

    //console.log("transformResponseSolicitudAnexo " + res);
    let solicitudAnexo:SolicitudAnexo = new SolicitudAnexo();

    solicitudAnexo.idSolicitudAnexos = res.idSolicitudAnexos;
    solicitudAnexo.idCliente = res.idCliente;
    solicitudAnexo.nombreArchivo = res.nombreArchivo;
    solicitudAnexo.tipoServicio = res.tipoServicio;
    solicitudAnexo.urlArchivo = res.urlArchivo;
    //solicitudAnexo.archivo = res.archivo;

    return solicitudAnexo;
  }

  public static transformResponseProspectoComentarios(res){

    //console.log("transformResponseProspectoComentarios " + res);
    let comentarios:ProspectoComentario[] = new Array<ProspectoComentario>();
    res.forEach(function(data)
    {
      //console.log(data);
      let comentario:ProspectoComentario = new ProspectoComentario();

      comentario.idProspectoComentario = data.idProspectoComentario;
      comentario.idCliente = data.idCliente;

      //console.log(data.appUsuario);
      comentario.usuario = ServicesContants.transformResponseUsuario(data.appUsuario);
      comentario.descripcion = data.descripcion;
      comentario.fechaActualizacion = data.fechaActualizacion;

      comentarios.push(comentario);
    });

    return comentarios;
  }

  public static transformResponseUsuario(usuario){

    let us:Usuario = new Usuario();

    us.idUsuario = usuario.idUsuario;
    us.nombreCompleto = usuario.nombreCompleto;
    us.imagen = usuario.imagen;
    us.estatusApp = usuario.estatusApp;
    us.activo

    return us;
  }

  public static transformServicioMovil(servicioMovil){

    let servMovil:ServicioMovil = new ServicioMovil();
    servMovil = servicioMovil;

    return servMovil;
  }

  public static transformServicioFijo(servicioFijo){

    let servFijo:ServicioFijo = new ServicioFijo();
    servFijo = servicioFijo;

    return servFijo;
  }

  public static transformFormaPago(formaPago){

    //console.log("transformFormaPago : ");console.log(formaPago);
    let fPago:FormaPago = new FormaPago();
    fPago = formaPago;

    return fPago;
  }

  public static transformServiciosMovilContratados(serviciosMovilContratados){

    let servMovilContratados:ServicioMovilContratado[] = new Array<ServicioMovilContratado>();
    serviciosMovilContratados.forEach(function(data)
    {
      //console.log(data);
      let servicioMovilContratado:ServicioMovilContratado = new ServicioMovilContratado();
      servicioMovilContratado = data;

      //comentario.idProspectoComentario = data.idProspectoComentario;

      servMovilContratados.push(servicioMovilContratado);
    });

    return servMovilContratados;
  }

  public static transformInternetFijo(internetFijo){

    let intFijo:InternetFijo = new InternetFijo();
    intFijo.noContrato = internetFijo.noContrato;
    intFijo.descuento = internetFijo.descuento;
    intFijo.noConexionReferencia = internetFijo.noConexionReferencia;
    intFijo.noFacturar = internetFijo.noFacturar;
    intFijo.noPeticion = internetFijo.noPeticion;
    intFijo.otroTipoTecnologia = internetFijo.otroTipoTecnologia;
    intFijo.pensionBasicaMensual = internetFijo.pensionBasicaMensual;
    intFijo.planContratado = internetFijo.planContratado;
    intFijo.tipoTecnologia = internetFijo.tipoTecnologia;
    intFijo.tipoValorInscripcion = internetFijo.tipoValorInscripcion;
    intFijo.valorInscripcion = internetFijo.valorInscripcion;

    return intFijo;
  }

  public static transformTelevisionSuscripcion(televisionSuscripcion){
    let teleSuscripcion:TelevisionSuscripcion = new TelevisionSuscripcion();
    teleSuscripcion = televisionSuscripcion;
    //teleSuscripcion.noContrato = televisionSuscripcion.noContrato;

    return teleSuscripcion;
  }

  public static transformTelefoniaFija(telefoniaFija){
    let telFija:TelefoniaFija = new TelefoniaFija();
    telFija = telefoniaFija;
    //telFija.noContrato = telefoniaFija.noContrato;

    return telFija;
  }

  public static transformProspecto(prospectoE){

    //console.log("transformProspecto : " + prospectoE);
    let prospecto:Prospecto = new Prospecto();
    prospecto.idCliente = prospectoE.idCliente;
    prospecto.buroCredito = prospectoE.buroCredito;
    prospecto.etapa = prospectoE.etapa;
    prospecto.estatus = prospectoE.estatus;
    prospecto.probabilidad = prospectoE.probabilidad;
    prospecto.fechaAsignacion = prospectoE.fechaAsignacion;
    prospecto.fechaRegistro = prospectoE.fechaRegistro;
    prospecto.sfInternetFijo = prospectoE.sfInternetFijo;
    prospecto.sfTelefoniaFija = prospectoE.sfTelefoniaFija;
    prospecto.sfTelevisionSuscripcion = prospectoE.sfTelevisionSuscripcion;
    prospecto.solicitudServiciosFijos = prospectoE.solicitudServiciosFijos;
    prospecto.solicitudServiciosMoviles = prospectoE.solicitudServiciosMoviles;
    prospecto.ultimaActualizacion = prospectoE.ultimaActualizacion;
    prospecto.voto = prospectoE.voto;
    prospecto.estatusComentario = prospectoE.estatusComentario;

    return prospecto;
  }

  public static transformAsignado(asignado){

    let asign:Usuario = new Usuario();
    asign.idUsuario = asignado.idUsuario;
    asign.activo = asignado.activo;
    asign.email = asignado.email;
    asign.estatusApp = asignado.estatusApp;
    asign.imagen = asignado.imagen;
    asign.nombreCompleto = asignado.nombreCompleto;
    asign.nombreUsuario = asignado.nombreUsuario;
    asign.password = asignado.password;
    asign.telefono = asignado.telefono;
    asign.ultimoIngreso = asignado.ultimoIngreso;

    return asign;
  }

  public static transformDireccionProspecto(direccionProspecto){

    let dProspecto:DireccionProspecto = new DireccionProspecto();

    dProspecto.idDireccionProspecto = direccionProspecto.idDireccionProspecto;
    dProspecto.ciudad = direccionProspecto.ciudad;
    dProspecto.callePrincipal = direccionProspecto.callePrincipal;
    dProspecto.calleSecundaria = direccionProspecto.calleSecundaria;
    dProspecto.edificio = direccionProspecto.edificio;
    dProspecto.latitud = direccionProspecto.latitud;
    dProspecto.longitud = direccionProspecto.longitud;
    dProspecto.noDepartamento = direccionProspecto.noDepartamento;
    dProspecto.numero = direccionProspecto.numero;
    dProspecto.piso = direccionProspecto.piso;
    dProspecto.provincia = direccionProspecto.provincia;
    dProspecto.sector = direccionProspecto.sector;

    return dProspecto;
  }

  public static transformDireccionCliente(direccionCliente){

    let dCliente:DireccionCliente = new DireccionCliente();

    dCliente.idDireccionCliente = direccionCliente.idDireccionCliente;
    dCliente.ciudad = direccionCliente.ciudad;
    dCliente.callePrincipal = direccionCliente.callePrincipal;
    dCliente.calleSecundaria = direccionCliente.calleSecundaria;
    dCliente.edificio = direccionCliente.edificio;
    dCliente.latitud = direccionCliente.latitud;
    dCliente.longitud = direccionCliente.longitud;
    dCliente.noDepartamento = direccionCliente.noDepartamento;
    dCliente.numero = direccionCliente.numero;
    dCliente.piso = direccionCliente.piso;
    dCliente.provincia = direccionCliente.provincia;

    return dCliente;
  }
}
