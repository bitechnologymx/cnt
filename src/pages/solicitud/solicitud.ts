import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { saveAs } from 'file-saver/FileSaver';
import { FileOpener } from '@ionic-native/file-opener';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { HomeVendedorPage } from '../../pages/home-vendedor/home-vendedor';

import { AppContants } from "../../providers/app.constants";
import { Usuario } from "../../providers/interfaces/usuario.interface";
import { InformacionCliente } from "../../providers/interfaces/informacionCliente.interface";
import { DireccionCliente } from "../../providers/interfaces/direccionCliente.interface";
import { Prospecto } from "../../providers/interfaces/prospecto.interface";
import { DireccionProspecto } from "../../providers/interfaces/direccionProspecto.interface";
import { ServicioFijo } from "../../providers/interfaces/servicioFijo.interface";
import { FormaPago } from "../../providers/interfaces/formaPago.interface";
import { InternetFijo } from "../../providers/interfaces/internetFijo.interface";
import { TelefoniaFija } from "../../providers/interfaces/telefoniaFija.interface";
import { TelevisionSuscripcion } from "../../providers/interfaces/televisionSuscripcion.interface";
import { ServicioMovil } from "../../providers/interfaces/servicioMovil.interface";
import { ServicioMovilContratado } from "../../providers/interfaces/servicioMovilContratado.interface";
import { SolicitudAnexo } from "../../providers/interfaces/solicitudAnexo.interface";

import { InformacionClientesProvider } from "../../providers/services/informacion-clientes.services";
import { TelefoniaFijaProvider } from "../../providers/services/telefonia-fija.services";
import { InternetFijoProvider } from "../../providers/services/internet-fijo.services";
import { TelevisionSuscripcionProvider } from "../../providers/services/television-suscripcion.services";
import { ServicioMovilProvider } from "../../providers/services/servicio-movil.services";
import { ServicioFijoProvider } from "../../providers/services/servicio-fijo.services";
import { FormaPagoProvider } from '../../providers/services/forma-pago.services';
import { SolicitudAnexoProvider } from '../../providers/services/solicitud-anexo.services';

@Component({
  selector: 'page-solicitud',
  templateUrl: 'solicitud.html'
})
export class SolicitudPage implements OnInit {

  private saveResponseInfoCliente:string;
  private saveResponseTelFija:string;
  private saveResponseInternetFijo:string;
  private saveResponseTelevisionSuscripcion:string;
  private saveResponseServicioMovilContratado:string;
  private saveResponseTelFijaFormaPago:string;
  private saveResponseInternetFijoFormaPago:string;
  private saveResponseTelevisionSuscripcionFormaPago:string;
  private saveResponseServicioMovilFormaPago:string;
  private saveResponseAutorizacionDebito:string;
  private saveResponsePoliticaBuenUso:string;
  private saveResponseAutorizacionEnvioInformacion:string;
  private saveResponseAnexosServFijoFirma:string;
  private saveResponseAnexosServMovilFirma:string;

  private activeTab:number;
  private toogleSolicitud:boolean = false;
  private toogleAnexos:boolean = false;
  private informacionCliente:InformacionCliente;
  private solicitudesAnexoServFijos:SolicitudAnexo[];
  private solicitudesAnexoServMoviles:SolicitudAnexo[];

  decoAdicSd:string = "";decoAdicHd:string = "";
  decoAdicZapper:string = "";decoAdicOtros:string = "";

  step1Tab:string = "in active"; step2Tab:string = ""; step3Tab:string = "";
  step4Tab:string = ""; step5Tab:string = ""; step6Tab:string = "";
  step1Btn:string = "active show"; step2Btn:string = ""; step3Btn:string = "";
  step4Btn:string = ""; step5Btn:string = ""; step6Btn:string = "";

  ssTelefoniaTab:string = "in active"; ssInternetTab:string = ""; ssTelevisionTab:string = "";
  ssTelefoniaLink:string = "active"; ssInternetLink:string = ""; ssTelevisionLink:string = "";

  fpTelefoniaTab:string = "in active"; fpInternetTab:string = ""; fpTelevisionTab:string = ""; fpServicioMovilTab:string = "";
  fpTelefoniaLink:string = "active"; fpInternetLink:string = ""; fpTelevisionLink:string = ""; fpServicioMovilLink:string = "";

  isCollapsedTelefoniaVentanilla:boolean = true;
  isCollapsedTelefoniaDebito:boolean = true;
  isCollapsedTelefoniaCredito:boolean = true;

  isCollapsedInternetVentanilla:boolean = false;
  isCollapsedTelevisionVentanilla:boolean = false;
  isCollapsedServiciosMovilesVentanilla:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private geolocation: Geolocation, private appContants: AppContants, private camera: Camera,
              private informacionClientesProvider: InformacionClientesProvider,
              private telefoniaFijaProvider: TelefoniaFijaProvider,
              private internetFijoProvider: InternetFijoProvider,
              private televisionSuscripcionProvider: TelevisionSuscripcionProvider,
              private servicioMovilProvider: ServicioMovilProvider,
              private formaPagoProvider: FormaPagoProvider,
              private servicioFijoProvider: ServicioFijoProvider,
              private solicitudAnexoProvider: SolicitudAnexoProvider, private fileOpener: FileOpener) {
    this.informacionCliente = this.navParams.get("informacionCliente");
    console.log("SolicitudPage"); console.log(this.informacionCliente);
    this.activeTab = 1;
    this.initNullEntities();
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.getSolicitudesAnexoServFijo();
    this.getSolicitudesAnexoServMovil();
  }

  public initNullEntities(){
    if (this.informacionCliente.direccionCliente==null){
      this.informacionCliente.direccionCliente = new DireccionCliente();
    }
    if (this.informacionCliente.servicioFijo==null){
      this.informacionCliente.servicioFijo = new ServicioFijo();
    }
    if (this.informacionCliente.servicioFijo.telefoniaFija==null){
      this.informacionCliente.servicioFijo.telefoniaFija = new TelefoniaFija();
      this.informacionCliente.servicioFijo.telefoniaFija.formaPago = new FormaPago();
    } else {
      if (this.informacionCliente.servicioFijo.telefoniaFija.formaPago==null){
        this.informacionCliente.servicioFijo.telefoniaFija.formaPago = new FormaPago();
      }
    }
    if (this.informacionCliente.servicioFijo.televisionSuscripcion==null){
      this.informacionCliente.servicioFijo.televisionSuscripcion = new TelevisionSuscripcion();
      this.informacionCliente.servicioFijo.televisionSuscripcion.formaPago = new FormaPago();
    } else {
      if (this.informacionCliente.servicioFijo.televisionSuscripcion.formaPago==null){
        this.informacionCliente.servicioFijo.televisionSuscripcion.formaPago = new FormaPago();
      }
    }
    if (this.informacionCliente.servicioFijo.internetFijo==null){
      this.informacionCliente.servicioFijo.internetFijo = new InternetFijo();
      this.informacionCliente.servicioFijo.internetFijo.formaPago = new FormaPago();
    } else {
      if (this.informacionCliente.servicioFijo.internetFijo.formaPago==null){
        this.informacionCliente.servicioFijo.internetFijo.formaPago = new FormaPago();
      }
    }
    if (this.informacionCliente.servicioMovil==null){
      this.informacionCliente.servicioMovil = new ServicioMovil();
      this.informacionCliente.servicioMovil.formaPago = new FormaPago();
    } else {
      if (this.informacionCliente.servicioMovil.formaPago==null){
        this.informacionCliente.servicioMovil.formaPago = new FormaPago();
      }
    }
    if (this.informacionCliente.servicioMovil.servicioMovilContratado == undefined){
      let servicioMovilContratado = new ServicioMovilContratado();
      let servMovilContratados:ServicioMovilContratado[] = new Array<ServicioMovilContratado>();
      this.informacionCliente.servicioMovil.servicioMovilContratado = servMovilContratados;
      this.informacionCliente.servicioMovil.servicioMovilContratado.push(servicioMovilContratado);
    }
  }

  public exportSolicitud(){
    this.informacionClientesProvider.exportSolicitud(this.informacionCliente).subscribe(
     data  => {
       saveAs(data, 'Reporte_Solicitud_'+this.informacionCliente.idCliente+'.pdf');
     });
  }

  public getSolicitudesAnexoServFijo(){
    this.solicitudAnexoProvider.solicitudesAnexo(this.informacionCliente.idCliente, this.appContants.TIPO_SERVICIO_FIJO).subscribe( data =>
      {
        console.log(data); this.solicitudesAnexoServFijos = data;
      });
  }

  public getSolicitudesAnexoServMovil(){
    this.solicitudAnexoProvider.solicitudesAnexo(this.informacionCliente.idCliente, this.appContants.TIPO_SERVICIO_MOVIL).subscribe( data =>
      {
        console.log(data); this.solicitudesAnexoServMoviles = data;
      });
  }

  public openFile(fileUrl){
    console.log(fileUrl);
    this.fileOpener.open(fileUrl, 'image/jpeg')
    .then(() => console.log('File is opened'))
    .catch(e => console.log('Error opening file', e));
  }

  public takePhoto(tipoServicio){

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
     solicitudAnexo.tipoServicio = tipoServicio;
     solicitudAnexo.archivo = "";
     solicitudAnexo.urlArchivo = imageData;

     this.solicitudAnexoProvider.saveSolicitudAnexo(solicitudAnexo).subscribe( data => {
         console.log("saveSolicitudAnexo" + solicitudAnexo);
         if (data){
           if (tipoServicio==this.appContants.TIPO_SERVICIO_FIJO){
            this.solicitudesAnexoServFijos.push(solicitudAnexo);
          } else {
            this.solicitudesAnexoServMoviles.push(solicitudAnexo);
          }
         }
       });
    }, (err) => {

    });
  }

  public saveAnexosServMovilFirma(informacionCliente:InformacionCliente){

    console.log("saveAnexosServMovilFirma : ");console.log(informacionCliente);
    this.servicioMovilProvider.saveAnexosServMovilFirma(informacionCliente).subscribe( data => {
      console.log("saveAnexosServMovilFirma" + data);
      if (data){
        this.saveResponseAnexosServMovilFirma = "Tus datos fueron guardados correctamente.";
      }
    });
  }

  public saveAnexosServFijoFirma(informacionCliente:InformacionCliente){

    console.log("saveAnexosServFijoFirma : ");console.log(informacionCliente);
    this.servicioFijoProvider.saveAnexosServFijoFirma(informacionCliente).subscribe( data => {
      console.log("saveAnexosServFijoFirma" + data);
      if (data){
        this.saveResponseAnexosServFijoFirma = "Tus datos fueron guardados correctamente.";
      }
    });
  }

  public saveAutorizacionEnvioInformacion(informacionCliente:InformacionCliente){

    console.log("saveAutorizacionEnvioInformacion Fijo : ");console.log(informacionCliente);
    this.servicioFijoProvider.saveAutorizacionEnvioInformacion(informacionCliente).subscribe( data => {
      console.log("saveAutorizacionEnvioInformacion" + data);
      if (data){
        this.saveResponseAutorizacionEnvioInformacion = "Tus datos fueron guardados correctamente.";
      }
    });

    this.servicioMovilProvider.saveAutorizacionEnvioInformacion(informacionCliente).subscribe( data => {
      console.log("saveAutorizacionEnvioInformacion Movil : " + data);
      if (data){
        this.saveResponseAutorizacionEnvioInformacion = "Tus datos fueron guardados correctamente.";
      }
    });
  }

  public saveAutorizacionDebito(informacionCliente:InformacionCliente){

    console.log("saveAutorizacionDebito : ");console.log(informacionCliente);
    this.formaPagoProvider.saveAutorizacionDebito(informacionCliente).subscribe( data => {
      console.log("saveAutorizacionDebito" + data);
      if (data){
        this.saveResponseAutorizacionDebito = "Tus datos fueron guardados correctamente.";
      }
    });
  }

  public savePoliticaBuenUso(informacionCliente:InformacionCliente){

    console.log("savePoliticaBuenUso : ");console.log(informacionCliente);
    this.servicioFijoProvider.savePoliticaBuenUso(informacionCliente).subscribe( data => {
      console.log("savePoliticaBuenUso" + data);
      if (data){
        this.saveResponsePoliticaBuenUso = "Tus datos fueron guardados correctamente.";
      }
    });
  }

  public saveFormaPago(informacionCliente:InformacionCliente, tipoServicio:string){

    console.log("saveFormaPago : ");console.log(informacionCliente);
    this.formaPagoProvider.saveFormaPago(informacionCliente,tipoServicio).subscribe( data => {
      console.log("saveFormaPago" + data);
      if (data){
        if (tipoServicio == this.appContants.FORMA_PAGO_INTERNET_FIJO){
          this.saveResponseInternetFijoFormaPago = "Tus datos fueron guardados correctamente.";
        } else if (tipoServicio == this.appContants.FORMA_PAGO_TELEFONIA_FIJA){
          this.saveResponseTelFijaFormaPago = "Tus datos fueron guardados correctamente.";
        } else if (tipoServicio == this.appContants.FORMA_PAGO_TELEVISION_SUSCRIPCION){
          this.saveResponseTelevisionSuscripcionFormaPago = "Tus datos fueron guardados correctamente.";
        } else if (tipoServicio == this.appContants.FORMA_PAGO_SERVICIO_MOVIL){
          this.saveResponseServicioMovilFormaPago = "Tus datos fueron guardados correctamente.";
        }
      }
    });
  }

  public saveServicioMovilContratado(informacionCliente:InformacionCliente){

    console.log("saveServicioMovilContratado : ");console.log(informacionCliente);

    let servMProvider = this.servicioMovilProvider;
    let responseServicioMovilContratado = "";

    informacionCliente.servicioMovil.servicioMovilContratado.forEach(function(data) {
      servMProvider.saveServicioMovilContratado(informacionCliente.idCliente, data).subscribe( data => {
        console.log("saveServicioMovilContratado" + data);
        if (data){
          responseServicioMovilContratado = "Tus datos fueron guardados correctamente.";
        }
      });
    });

    this.saveResponseServicioMovilContratado = responseServicioMovilContratado;
  }

  public saveTelevisionSuscripcion(informacionCliente:InformacionCliente){

    console.log("saveTelevisionSuscripcion : ");console.log(informacionCliente);
    this.televisionSuscripcionProvider.saveTelevisionSuscripcion(informacionCliente).subscribe( data => {
      console.log("saveTelevisionSuscripcion" + data);
      if (data){
        this.saveResponseTelevisionSuscripcion = "Tus datos fueron guardados correctamente.";
      }
    });
  }

  public saveInternetFijo(informacionCliente:InformacionCliente){

    console.log("saveInternetFijo : ");console.log(informacionCliente);
    this.internetFijoProvider.saveInternetFijo(informacionCliente).subscribe( data => {
      console.log("saveInternetFijo" + data);
      if (data){
        this.saveResponseInternetFijo = "Tus datos fueron guardados correctamente.";
      }
    });
  }

  public saveTelefoniaFija(informacionCliente:InformacionCliente){

    console.log("saveTelefoniaFija : ");console.log(informacionCliente);
    this.telefoniaFijaProvider.saveTelefoniaFija(informacionCliente).subscribe( data => {
      console.log("saveTelefoniaFija" + data);
      if (data){
        this.saveResponseTelFija = "Tus datos fueron guardados correctamente.";
      }
    });
  }

  public saveInformacionCliente(informacionCliente:InformacionCliente){

    this.informacionClientesProvider.saveInformacionCliente(informacionCliente).subscribe( data => {
      console.log("saveInformacionCliente" + data);
      if (data){
        this.saveResponseTelFija = "Tus datos fueron guardados correctamente.";
        this.informacionCliente.prospectoE.fechaRegistro = new Date().toString();
      }
    });
  }

  public toogleSolicitudF(){
    this.toogleSolicitud = !this.toogleSolicitud;
  }

  public toogleAnexosF(){
    this.toogleAnexos = !this.toogleAnexos;
  }

  public move(next){
    console.log("move : " + next + " - " + this.activeTab);
    if (this.activeTab==1){
      if (next){ this.showTab(this.activeTab+1); } else { this.navCtrl.pop(); }
    } else if (this.activeTab==6){
      if (next){ this.navCtrl.pop(); } else { this.showTab(this.activeTab-1); }
    } else {
      if (next){ this.showTab(this.activeTab+1); } else { this.showTab(this.activeTab-1); }
    }
  }

  public showTab(id){
    console.log("showTab : " + id);
    this.hideTabs();
    this.activeTab = id;
    if (id==1){ this.step1Tab = "in active"; this.step1Btn = "active show";}
    else if (id==2){ this.step2Tab = "in active"; this.step2Btn = "active show";}
    else if (id==3){ this.step3Tab = "in active"; this.step3Btn = "active show";}
    else if (id==4){ this.step4Tab = "in active"; this.step4Btn = "active show";}
    else if (id==5){ this.step5Tab = "in active"; this.step5Btn = "active show";}
    else if (id==6){ this.step6Tab = "in active"; this.step6Btn = "active show";}
    window.scrollTo(0, 0);
  }

  public hideTabs(){
    this.step1Tab = "";this.step2Tab = "";this.step3Tab = "";
    this.step4Tab = "";this.step5Tab = "";this.step6Tab = "";
    this.step1Btn = "";this.step2Btn = "";this.step3Btn = "";
    this.step4Btn = "";this.step5Btn = "";this.step6Btn = "";
  }

  public showTabServiciosFijos(id){
    this.hideTabsServiciosFijos();
    if (id==1){ this.ssTelefoniaTab = "in active"; this.ssTelefoniaLink = "active";}
    else if (id==2){ this.ssInternetTab = "in active"; this.ssInternetLink = "active";}
    else if (id==3){ this.ssTelevisionTab = "in active"; this.ssTelevisionLink = "active";}
  }

  public hideTabsServiciosFijos(){
    this.ssTelefoniaTab = "";this.ssInternetTab = "";this.ssTelevisionTab = "";
    this.ssTelefoniaLink = "";this.ssInternetLink = "";this.ssTelevisionLink = "";
  }

  public showTabFormaPago(id){
    this.hideTabsFormaPago();
    if (id==1){ this.fpTelefoniaTab = "in active"; this.fpTelefoniaLink = "active";}
    else if (id==2){ this.fpInternetTab = "in active"; this.fpInternetLink = "active";}
    else if (id==3){ this.fpTelevisionTab = "in active"; this.fpTelevisionLink = "active";}
    else if (id==4){ this.fpServicioMovilTab = "in active"; this.fpServicioMovilLink = "active";}
  }

  public hideTabsFormaPago(){
    this.fpTelefoniaTab = "";this.fpInternetTab = "";this.fpTelevisionTab = "";this.fpServicioMovilTab = "";
    this.fpTelefoniaLink = "";this.fpInternetLink = "";this.fpTelevisionLink = "";this.fpServicioMovilLink = "";
  }

  public getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude); console.log(resp.coords.longitude);
      this.informacionCliente.direccionCliente.latitud = resp.coords.latitude.toString();
      this.informacionCliente.direccionCliente.longitud = resp.coords.longitude.toString();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  public dashboardVendedor(){
    this.navCtrl.pop();
  }
}
