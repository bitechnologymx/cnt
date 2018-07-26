import { AfterViewInit, Component, Input, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AppContants } from "../../providers/app.constants";
import { CacheProvider } from "../../providers/services/cache.services";

import { EditCardLeadPage } from '../../pages/leads/editCardLead';
import { NewCardLeadPage } from '../../pages/leads/newCardLead';
import { UsuariosProvider } from "../../providers/services/usuarios.services";
import { Usuario } from "../../providers/interfaces/usuario.interface";

import { InformacionClientesProvider } from "../../providers/services/informacion-clientes.services";
import { InformacionCliente } from "../../providers/interfaces/informacionCliente.interface";
import { Prospecto } from "../../providers/interfaces/prospecto.interface";

import { MapAsignacionesComponent } from '../../pages/home-vendedor/map-asignaciones/map-asignaciones-component';
import { NuevasAsignacionesComponent } from '../../pages/home-vendedor/nuevas-asignaciones/nuevas-asignaciones-component';

@Component({
  selector: 'page-home',
  templateUrl: 'home-vendedor.html'
})
export class HomeVendedorPage implements OnInit {

  leadsAsignados = 0;
  leadsGanados = 0;
  leadsStandBy = 0;
  leadsPerdidos = 0;

  ngOnInit(): void {
    console.log("HomeVendedorPage OnInit");
    this.getUsersRecentActivity();
    this.getInformacionClientes();
  }

  @ViewChild(MapAsignacionesComponent) childMapAsignacionesComponent:MapAsignacionesComponent;
  @ViewChild(NuevasAsignacionesComponent) childNuevasAsignacionesComponent:NuevasAsignacionesComponent;

  public usersRecentActivity:Usuario[];
  @Input() public informacionClientes:InformacionCliente[];

  public usuario:Usuario;

  public isCollapsedMap = false;
  public isCollapsedAsignaciones = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private usuariosProvider: UsuariosProvider,
              private informacionClientesProvider: InformacionClientesProvider,
              private cacheProvider: CacheProvider,
              public appContants: AppContants) {
      this.usuario = this.navParams.get("usuario");
  }

  public getUsersRecentActivity(){
    this.usuariosProvider.usersRecentActivity().subscribe( data =>
      {
        //console.log(data);
        this.usersRecentActivity = data;
      });
  }

  public getInformacionClientes(){
    this.informacionClientesProvider.informacionClientes(this.usuario.idUsuario).subscribe( data =>
      {
        //console.log(data);
        //this.cacheProvider.cacheInformacionClientes$ = data.asObservable();
        this.informacionClientes = data;
        this.childMapAsignacionesComponent.initMapAndMarkers(this.informacionClientes);
        this.childNuevasAsignacionesComponent.initAsignaciones(this.informacionClientes);
        this.countAsignaciones(this.informacionClientes);
      });
  }

  public countAsignaciones(informacionClientes){
    for (let informacionCliente of informacionClientes) {

      //console.log(informacionCliente);
      if (informacionCliente.prospectoE!=null){

        if (informacionCliente.prospectoE.estatus == this.appContants.ESTATUS_USUARIO_ACTIVO){
          this.leadsAsignados = this.leadsAsignados + 1;
        } else if (informacionCliente.prospectoE.estatus == this.appContants.ESTATUS_USUARIO_GANADO){
          this.leadsGanados = this.leadsGanados + 1;
        } else if (informacionCliente.prospectoE.estatus == this.appContants.ESTATUS_USUARIO_STANDBY){
          this.leadsStandBy = this.leadsStandBy + 1;
        } else if (informacionCliente.prospectoE.estatus == this.appContants.ESTATUS_USUARIO_PERDIDO){
          this.leadsPerdidos = this.leadsPerdidos + 1;
        }
      }
    }
  }

  public newCardLead(){
    let informacionCliente: InformacionCliente = new InformacionCliente();
    informacionCliente.prospectoE = new Prospecto();
    this.navCtrl.push(NewCardLeadPage, { 'informacionCliente': informacionCliente, 'parent': this });
  }

}
