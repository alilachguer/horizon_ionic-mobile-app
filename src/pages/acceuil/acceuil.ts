import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AcceuilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acceuil',
  templateUrl: 'acceuil.html',
})
export class AcceuilPage {

  profil : any; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profil = navParams.get('profil');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcceuilPage');
  }

}
