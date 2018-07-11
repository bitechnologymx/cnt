import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DashboardPage } from '../../../shared/dashboard/dashboard';

@Component({
  selector: 'csearch',
  templateUrl: 'search.html'
})
export class SearchComponent {

    public app : any;
    public searchActived : any;

    constructor() {
      this.app = {
          layout: {
              searchActived: false
          }
      };
    }

}
