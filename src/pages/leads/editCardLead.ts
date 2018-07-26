import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, Content  } from 'ionic-angular';

import { FileOpener } from '@ionic-native/file-opener';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { AppContants } from "../../providers/app.constants";
import { HomeVendedorPage } from '../../pages/home-vendedor/home-vendedor';
import { EditLeadPage } from '../../pages/leads/editLead';

import { InformacionCliente } from "../../providers/interfaces/informacionCliente.interface";
import { Prospecto } from "../../providers/interfaces/prospecto.interface";
import { ProspectoComentario } from "../../providers/interfaces/prospectoComentario.interface";
import { ProspectoEtapaHistorial } from "../../providers/interfaces/prospectoEtapaHistorial.interface";
import { SolicitudAnexo } from "../../providers/interfaces/solicitudAnexo.interface";

import { ProspectoProvider } from "../../providers/services/prospecto.services";
import { SolicitudAnexoProvider } from '../../providers/services/solicitud-anexo.services';



@Component({
  selector: 'edit-page-cardLead',
  templateUrl: 'editCardLead.html'
})
export class EditCardLeadPage implements OnInit {

  @ViewChild(Content) content: Content;

  private informacionCliente:InformacionCliente;
  private comentarios:ProspectoComentario[];
  private etapasHistorial:ProspectoEtapaHistorial[];
  private solicitudesAnexo:SolicitudAnexo[];

  ngOnInit(): void {
    console.log("EditCardLeadPage OnInit");
    this.getComentariosProspecto();
    this.getEstatusEtapaProspecto();
    this.getSolicitudesAnexo();
  }

  constructor(public navCtrl: NavController, config: NgbDropdownConfig, public navParams: NavParams, private appContants: AppContants,
              private prospectoProvider: ProspectoProvider, private camera: Camera, private solicitudAnexoProvider: SolicitudAnexoProvider,
              private fileOpener: FileOpener) {
    this.informacionCliente = this.navParams.get("informacionCliente");
    config.placement = 'bottom-left';
    config.autoClose = 'outside';
    (<any>config).autoClose = 'outside';
    window.scrollTo(0, 0);
  }

  public toogleEtiqueta(informacionCliente:InformacionCliente, prop){

    let value = false;

    if (prop == "solicitudServiciosMoviles"){
      informacionCliente.prospectoE.solicitudServiciosMoviles = !informacionCliente.prospectoE.solicitudServiciosMoviles;
      value = informacionCliente.prospectoE.solicitudServiciosMoviles;
    } else if (prop == "solicitudServiciosFijos"){
      informacionCliente.prospectoE.solicitudServiciosFijos = !informacionCliente.prospectoE.solicitudServiciosFijos;
      value = informacionCliente.prospectoE.solicitudServiciosFijos;
    } else if (prop == "sfTelefoniaFija"){
      informacionCliente.prospectoE.sfTelefoniaFija = !informacionCliente.prospectoE.sfTelefoniaFija;
      value = informacionCliente.prospectoE.sfTelefoniaFija;
    } else if (prop == "sfTelevisionSuscripcion"){
      informacionCliente.prospectoE.sfTelevisionSuscripcion = !informacionCliente.prospectoE.sfTelevisionSuscripcion;
      value = informacionCliente.prospectoE.sfTelevisionSuscripcion;
    } else if (prop == "sfInternetFijo"){
      informacionCliente.prospectoE.sfInternetFijo = !informacionCliente.prospectoE.sfInternetFijo;
      value = informacionCliente.prospectoE.sfInternetFijo;
    } else if (prop == "buroCredito"){
      informacionCliente.prospectoE.buroCredito = !informacionCliente.prospectoE.buroCredito;
      value = informacionCliente.prospectoE.buroCredito;
    } else if (prop == "voto"){
      informacionCliente.prospectoE.voto = !informacionCliente.prospectoE.voto;
      value = informacionCliente.prospectoE.voto;
    }

    this.prospectoProvider.updateProspectoBooleanProperty(informacionCliente.prospectoE.idCliente, prop, value).subscribe( data => {
      console.log("toogleEtiqueta " + prop + " - " + value);
      if (data){
        informacionCliente.prospectoE.ultimaActualizacion = new Date().toString();
      }
    });

  }

  public openFile(fileUrl){
    console.log(fileUrl);
    this.fileOpener.open(fileUrl, 'image/jpeg')
    .then(() => console.log('File is opened'))
    .catch(e => console.log('Error opening file', e));
  }

  public takePhoto(){

    //destinationType: this.camera.DestinationType.FILE_URI,
    //destinationType: this.camera.DestinationType.DATA_URL,

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     let base64Image = 'data:image/jpeg;base64,' + imageData;

     const indexOfLastSlash = imageData.lastIndexOf('/');
     const path = imageData.substring(0, indexOfLastSlash);
     const filename = imageData.substring(indexOfLastSlash + 1);

     let solicitudAnexo:SolicitudAnexo = new SolicitudAnexo();
     solicitudAnexo.idCliente = this.informacionCliente.idCliente;
     solicitudAnexo.nombreArchivo = filename;
     solicitudAnexo.tipoServicio = "todos";
     solicitudAnexo.archivo = "";
     solicitudAnexo.urlArchivo = imageData;

     this.solicitudAnexoProvider.saveSolicitudAnexo(solicitudAnexo).subscribe( data => {
         console.log("saveSolicitudAnexo" + solicitudAnexo);
         if (data){
           this.solicitudesAnexo.push(solicitudAnexo);
         }
       });
    }, (err) => {

    });
  }

  public deleteSolicitudAnexo(solicitudAnexo:SolicitudAnexo){
    this.solicitudAnexoProvider.deleteSolicitudAnexo(solicitudAnexo).subscribe( data => {
      console.log("deleteSolicitudAnexo" + solicitudAnexo.idSolicitudAnexos);
      if (data){
        let index:number = 0;
        let indexEq:number = -1;
        for (let solAnexo of this.solicitudesAnexo) {
          if (solicitudAnexo.idSolicitudAnexos == solAnexo.idSolicitudAnexos){
            indexEq = index;
          }
          index = index+1;
        }
        this.solicitudesAnexo.splice(indexEq,1);
      }
    });
  }

  public onEnter(comentario: string, idCliente: number) {
    this.saveComentarioProspecto(comentario,idCliente);
  }

  public getSolicitudesAnexo(){
    this.solicitudAnexoProvider.solicitudesAnexo(this.informacionCliente.idCliente, "todos").subscribe( data =>
      {
        console.log(data); this.solicitudesAnexo = data;
      });
  }

  public getComentariosProspecto(){
    this.prospectoProvider.getComentariosProspecto(this.informacionCliente.idCliente).subscribe( data =>
      {
        console.log(data); this.comentarios = data;
      });
  }

  public getEstatusEtapaProspecto(){
    this.prospectoProvider.getEstatusEtapaProspecto(this.informacionCliente.idCliente).subscribe( data =>
      {
        console.log(data); this.etapasHistorial = data;
      });
  }

  public saveComentarioProspecto(comentario: string, idCliente: number){
    let idUsuario = this.appContants.ACTIVE_USER.idUsuario;
    this.prospectoProvider.saveProspectoComentario(idCliente, comentario, idUsuario).subscribe( data => {
      console.log("saveProspectoComentario" + comentario);
      if (data){ this.getComentariosProspecto(); }
    });
  }

  selectDropProbabilidad(probabilidadDropdown, informacionCliente: InformacionCliente){
    console.log("NuevasAsignacionesComponent selectDropEstatus : " + informacionCliente.prospectoE.idCliente);

    let probabilidad = informacionCliente.prospectoE.probabilidad;

    this.prospectoProvider.updateProspectoShortProperty(informacionCliente.prospectoE.idCliente, "probabilidad", probabilidad).subscribe( data => {
      console.log("updateProspectoShortProperty estatus" + data);
      if (data){ informacionCliente.prospectoE.ultimaActualizacion = new Date().toString(); }
    });
    probabilidadDropdown.close();
  }

  selectDropEstatus(estatusDrop, informacionCliente: InformacionCliente){
    console.log("NuevasAsignacionesComponent selectDropEstatus : " + informacionCliente.prospectoE.idCliente);

    let estatus = informacionCliente.prospectoE.estatus; //this.activeEstatus;
    let estatusComentario = informacionCliente.prospectoE.estatusComentario; //this.activeEstatusComentario;

    this.prospectoProvider.updateProspectoShortProperty(informacionCliente.prospectoE.idCliente, "estatus", estatus).subscribe( data => {
      console.log("updateProspectoShortProperty estatus" + data);
      if (data){
        informacionCliente.prospectoE.ultimaActualizacion = new Date().toString();
        this.prospectoProvider.updateProspectoStringProperty(informacionCliente.prospectoE.idCliente, "estatusComentario", estatusComentario).subscribe( data => {
          console.log("updateProspectoShortProperty estatusComentario" + data);
        });
      }
    });
    estatusDrop.close();
  }

  public home(){
    this.navCtrl.pop();
  }

  public editLead(){
    this.navCtrl.push(EditLeadPage, {'informacionCliente':this.informacionCliente});
  }
}
