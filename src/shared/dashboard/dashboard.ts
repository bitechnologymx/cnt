import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { LoginPage } from '../../pages/login/login';
import { HomeVendedorPage } from '../../pages/home-vendedor/home-vendedor';

import { AppContants } from "../../providers/app.constants";
import { CacheProvider } from "../../providers/services/cache.services";

import { Usuario } from "../../providers/interfaces/usuario.interface";

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [NgbDropdownConfig]
})
export class DashboardPage  implements AfterViewInit {

  @ViewChild('dashboardNav') nav: NavController;

  @ViewChild(HomeVendedorPage) childHomeVendedorPage: ElementRef;

  ngAfterViewInit(): void {
    console.log("DashboardPage ngAfterViewInit " + this.nav);
    this.nav.setRoot(HomeVendedorPage, {'usuario':this.usuario});
    //this.childHomeVendedorPage.usuario = this.usuario;
  }

  public app : any;

  actividadTab:string = "in active"; perfilTab:string = "";
  actividadBtn:string = "active"; perfilBtn:string = "";

  public usuario:Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public config: NgbDropdownConfig, public appContants: AppContants,
              private cacheProvider: CacheProvider) {

    this.usuario = this.navParams.get("usuario");
    config.placement = 'bottom-right';
    config.autoClose = false;

    this.app = {
      layout: {
        sidePanelOpen: false,
        isMenuOpened: true,
        isMenuCollapsed: false
      }
    };

  }

  public toogleActividadPerfil(tab){
    this.actividadTab="";this.perfilTab="";this.actividadBtn="";this.perfilBtn="";
    if (tab=="perfil"){
      this.perfilTab = "in active"; this.perfilBtn = "active";
    } else {
      this.actividadTab = "in active"; this.actividadBtn = "active";
    }
  }

  public login(){
    this.navCtrl.setRoot(LoginPage);
  }

  public ionViewWillEnter() {
    console.log("DashboardPage ionViewDidLoad " + this.childHomeVendedorPage);
  }

}
