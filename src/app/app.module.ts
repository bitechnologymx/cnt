import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NguiMapModule} from '@ngui/map';

import * as $ from 'jquery';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { CardLeadPage } from '../pages/leads/cardLead';
import { EditLeadPage } from '../pages/leads/editLead';
import { SolicitudPage } from '../pages/solicitud/solicitud';

import { Dashboard } from '../shared/dashboard/dashboard';
import { SideNavComponent } from '../shared/sidenav/sidenav-component';
import { SearchComponent } from '../shared/header/search/search-component';
import { FooterComponent } from '../shared/footer/footer-component';
import { ThemeConfigComponent } from '../shared/footer/theme-config-component';

import { MapAsignacionesComponent } from '../pages/home/map-asignaciones/map-asignaciones-component';
import { NuevasAsignacionesComponent } from '../pages/home/nuevas-asignaciones/nuevas-asignaciones-component';

import { AsignacionesProvider } from '../providers/asignaciones/asignaciones';

import { AsignacionesGridEstatusPipe } from '../pipes/asignaciones-grid/asignaciones-grid-estatus';
import { AsignacionesGridFechaPipe } from '../pipes/asignaciones-grid/asignaciones-grid-fecha';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,CardLeadPage,EditLeadPage,SolicitudPage,
    Dashboard,SideNavComponent,SearchComponent,FooterComponent,ThemeConfigComponent,
    NuevasAsignacionesComponent,MapAsignacionesComponent,
    AsignacionesGridEstatusPipe,AsignacionesGridFechaPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyA80cWOalTZWvHNwZWK9VEVVa3gYzOCKJE'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,CardLeadPage,EditLeadPage,SolicitudPage,
    Dashboard,SideNavComponent,SearchComponent,FooterComponent,ThemeConfigComponent,
    NuevasAsignacionesComponent,MapAsignacionesComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AsignacionesProvider
  ]
})
export class AppModule {}
