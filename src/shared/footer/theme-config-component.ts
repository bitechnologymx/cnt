import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'ctheme',
  templateUrl: 'theme-config.html'
})
export class ThemeConfigComponent {

    public app : any;

    public headerThemes: any;
    public changeHeader: any;
    public sidenavThemes: any;
    public changeSidenav: any;
    public headerSelected: any;
    public sidenavSelected : any;

    constructor() {
      this.app = {
          layout: {
              themeConfigOpen: false,
              rtlActived: false
          }
      };

      this.headerThemes = ['header-default', 'header-primary', 'header-info', 'header-success', 'header-danger', 'header-dark'];
      this.changeHeader = changeHeader;

      function changeHeader(headerTheme) {
          this.headerSelected = headerTheme;
      }

      this.sidenavThemes = ['sidenav-default', 'side-nav-dark'];
      this.changeSidenav = changeSidenav;

      function changeSidenav(sidenavTheme) {
          this.sidenavSelected = sidenavTheme;
      }
    }

}
