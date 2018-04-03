import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { AcceuilPage } from '../acceuil/acceuil';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userProfile: any;

  constructor(public navCtrl: NavController, public facebook : FacebookProvider) {

  }

  public fbLogin(){
    this.facebook.login().subscribe((connected)=>{   //On surveille l'observable afin de récupérer le status de connection
      if(connected === true){
        this.facebook.getProfile().subscribe((profile)=>{   //Si connecté, on récupére le profil
          this.userProfile = profile;
          this.navCtrl.push(AcceuilPage, {profil : this.userProfile});
        }, (error)=>{console.log(error); });
      }
    }, (error)=>{console.log(error);});
  }

}
