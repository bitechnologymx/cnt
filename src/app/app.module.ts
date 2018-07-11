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
import { CardLeadPage } from '../pages/leads/cardLead';
import { EditLeadPage } from '../pages/leads/editLead';
import { SolicitudPage } from '../pages/solicitud/solicitud';

import { SideNavComponent } from '../shared/sidenav/sidenav-component';
import { SearchComponent } from '../shared/header/search/search-component';
import { FooterComponent } from '../shared/footer/footer-component';
import { ThemeConfigComponent } from '../shared/footer/theme-config-component';

import { MapAsignacionesComponent } from '../pages/home-vendedor/map-asignaciones/map-asignaciones-component';
import { NuevasAsignacionesComponent } from '../pages/home-vendedor/nuevas-asignaciones/nuevas-asignaciones-component';

import { AsignacionesProvider } from '../providers/asignaciones/asignaciones';

import { PipesModule } from '../pipes/pipes.module';

import { LoginPageModule } from '../pages/login/login.module';
import { DashboardPageModule } from '../shared/dashboard/dashboard.module';

//import { AsignacionesGridEstatusPipe } from '../pipes/asignaciones-grid/asignaciones-grid-estatus';
//import { AsignacionesGridFechaPipe } from '../pipes/asignaciones-grid/asignaciones-grid-fecha';

//import { DashboardPage } from '../shared/dashboard/dashboard';

@NgModule({
  declarations: [
    MyApp,
    HomeVendedorPage,CardLeadPage,EditLeadPage,SolicitudPage,
    SideNavComponent,SearchComponent,FooterComponent,ThemeConfigComponent,
    NuevasAsignacionesComponent,MapAsignacionesComponent,
    //AsignacionesGridEstatusPipe,AsignacionesGridFechaPipe,
    //DashboardPage
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    DashboardPageModule,
    IonicModule.forRoot(MyApp),
    NgbModule.forRoot(),
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyA80cWOalTZWvHNwZWK9VEVVa3gYzOCKJE'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomeVendedorPage,CardLeadPage,EditLeadPage,SolicitudPage,
    SideNavComponent,SearchComponent,FooterComponent,ThemeConfigComponent,
    NuevasAsignacionesComponent,MapAsignacionesComponent,
    //DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AsignacionesProvider
  ]
})
export class AppModule {}
