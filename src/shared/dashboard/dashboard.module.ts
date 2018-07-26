import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { FileOpener } from '@ionic-native/file-opener';

import { SideNavComponent } from '../../shared/sidenav/sidenav-component';
import { SearchComponent } from '../../shared/header/search/search-component';
import { FooterComponent } from '../../shared/footer/footer-component';
import { ThemeConfigComponent } from '../../shared/footer/theme-config-component';

import { PipesModule } from '../../pipes/pipes.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DashboardPage,
    SideNavComponent,SearchComponent,FooterComponent,ThemeConfigComponent,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
    PipesModule,
    NgbModule.forRoot(),
  ],
  entryComponents: [
    SideNavComponent,SearchComponent,FooterComponent,ThemeConfigComponent,
  ],
  providers: [
    Geolocation,
    Camera,
    FileOpener,
  ],
})
export class DashboardPageModule {}
