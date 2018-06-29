import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import { Dashboard } from '../shared/dashboard/dashboard';
import { SideNavComponent } from '../shared/sidenav/sidenav-component';
import { SearchComponent } from '../shared/header/search/search-component';
import { FooterComponent } from '../shared/footer/footer-component';
import { ThemeConfigComponent } from '../shared/footer/theme-config-component';

import * as $ from 'jquery';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    Dashboard,SideNavComponent,SearchComponent,FooterComponent,ThemeConfigComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    Dashboard,SideNavComponent,SearchComponent,FooterComponent,ThemeConfigComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
