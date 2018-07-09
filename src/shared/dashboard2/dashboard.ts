import { Component, ViewChild, ApplicationRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {

  @ViewChild('dashboardNav') nav: NavController
  homePage = HomePage

  public app : any;

  constructor(public navCtrl: NavController, private ref: ApplicationRef) {
    this.app = {
      layout: {
        sidePanelOpen: false,
        isMenuOpened: true,
        isMenuCollapsed: false
      }
    };

  }

  ngOnInit():any {

    $('.side-nav .side-nav-menu li a').click(function(event) {
    if ($(this).parent().hasClass("open")) {

      $(this).parent().children('.dropdown-menu').slideUp(200, function() {
        $(this).parent().removeClass("open");
      });

    } else {
      $(this).parent().parent().children('li.open').children('.dropdown-menu').slideUp(200);
      $(this).parent().parent().children('li.open').children('a').removeClass('open');
      $(this).parent().parent().children('li.open').removeClass("open");
      $(this).parent().children('.dropdown-menu').slideDown(200, function() {
        $(this).parent().addClass("open");
      });
    }
  });
}

onLoad(page: any) {
  //this.nav.setRoot(page);
}

ngAfterViewInit(){
      //this.nav is now defined
      setTimeout(() => {
        //this.nav.push(SomeOtherPage);
      }, 2000);
    }
}
