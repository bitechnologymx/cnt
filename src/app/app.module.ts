import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NguiMapModule} from '@ngui/map';

import * as $ from 'jquery';

import { MyApp } from './app.component';

import { HomeVendedorPage } from '../pages/home-vendedor/home-vendedor';
import { EditCardLeadPage } from '../pages/leads/editCardLead';
import { NewCardLeadPage } from '../pages/leads/newCardLead';
import { EditLeadPage } from '../pages/leads/editLead';
import { NewLeadPage } from '../pages/leads/newLead';
import { SolicitudPage } from '../pages/solicitud/solicitud';

import { MapAsignacionesComponent } from '../pages/home-vendedor/map-asignaciones/map-asignaciones-component';
import { NuevasAsignacionesComponent } from '../pages/home-vendedor/nuevas-asignaciones/nuevas-asignaciones-component';

import { PipesModule } from '../pipes/pipes.module';

import { LoginPageModule } from '../pages/login/login.module';
import { DashboardPageModule } from '../shared/dashboard/dashboard.module';

// PROVIDERS
import { AutenticacionProvider } from '../providers/services/autenticacion.services';
import { AsignacionesProvider } from '../providers/services/asignaciones.services';
import { UsuariosProvider } from '../providers/services/usuarios.services';
import { ProspectoProvider } from '../providers/services/prospecto.services';
import { InformacionClientesProvider } from '../providers/services/informacion-clientes.services';
import { TelefoniaFijaProvider } from '../providers/services/telefonia-fija.services';
import { TelevisionSuscripcionProvider } from "../providers/services/television-suscripcion.services";
import { ServicioMovilProvider } from "../providers/services/servicio-movil.services";
import { ServicioFijoProvider } from "../providers/services/servicio-fijo.services";
import { InternetFijoProvider } from '../providers/services/internet-fijo.services';
import { SolicitudAnexoProvider } from '../providers/services/solicitud-anexo.services';
import { FormaPagoProvider } from '../providers/services/forma-pago.services';
import { CacheProvider } from '../providers/services/cache.services';

import { AppContants } from '../providers/app.constants';

import { HttpClientModule } from '@angular/common/http';
import { InterceptorService } from 'ng2-interceptors';

//import { AsignacionesGridEstatusPipe } from '../pipes/asignaciones-grid/asignaciones-grid-estatus';
//import { AsignacionesGridFechaPipe } from '../pipes/asignaciones-grid/asignaciones-grid-fecha';

//import { DashboardPage } from '../shared/dashboard/dashboard';

@NgModule({
  declarations: [
    MyApp,
    HomeVendedorPage,EditCardLeadPage,NewCardLeadPage,EditLeadPage,NewLeadPage,SolicitudPage,
    NuevasAsignacionesComponent,MapAsignacionesComponent,
    //AsignacionesGridEstatusPipe,AsignacionesGridFechaPipe,
    //DashboardPage
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    DashboardPageModule,
    PipesModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    NgbModule.forRoot(),
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyA80cWOalTZWvHNwZWK9VEVVa3gYzOCKJE'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomeVendedorPage,EditCardLeadPage,NewCardLeadPage,EditLeadPage,NewLeadPage,SolicitudPage,
    NuevasAsignacionesComponent,MapAsignacionesComponent,
    //DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AsignacionesProvider,AutenticacionProvider,UsuariosProvider,InformacionClientesProvider,ProspectoProvider,ServicioFijoProvider,
    TelefoniaFijaProvider,InternetFijoProvider,TelevisionSuscripcionProvider,ServicioMovilProvider,FormaPagoProvider,SolicitudAnexoProvider,
    AppContants,
    CacheProvider,
  ]
})
export class AppModule {}
