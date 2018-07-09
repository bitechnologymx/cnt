import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Dashboard } from '../../../shared/dashboard2/dashboard';

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
