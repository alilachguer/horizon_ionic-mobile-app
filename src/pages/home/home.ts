import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FacebookProvider } from '../../providers/facebook/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public facebook : FacebookProvider) {

  }

  public fbLogin(){
    this.facebook.login();
  }

}
