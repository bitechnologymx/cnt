import { AfterViewInit, Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomeVendedorPage {

  public isCollapsedMap = false;
  public isCollapsedAsignaciones = false;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit():any {

  }
}
