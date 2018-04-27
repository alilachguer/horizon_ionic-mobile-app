import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { AcceuilPage } from '../acceuil/acceuil';
import { RestProvider } from '../../providers/rest/rest';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public userProfile: any;
  public error : string; 

  constructor(public navCtrl: NavController, public facebook : FacebookProvider, public rest : RestProvider) {

  }

  public fbLogin(){
    this.facebook.login().subscribe((connected)=>{   //On surveille l'observable afin de récupérer le status de connection
      if(connected === true){
        this.facebook.getProfile().subscribe((profile)=>{   //Si connecté, on récupére le profil
          this.userProfile = profile;
          this.rest.checkUser(this.userProfile.id , this.userProfile.name)
          .then(data => {
            if(JSON.stringify(data) == "true"){
              this.navCtrl.push(AcceuilPage, {profil : this.userProfile});
            }else{
              this.rest.postUser(this.userProfile.id , this.userProfile.name)
              .then(data => {
              if(JSON.stringify(data) == "true"){
                this.navCtrl.push(AcceuilPage, {profil : this.userProfile});
                }else{
                  this.error = "an error has occured";
                }
              });
            }
          });
        }, (error)=>{console.log(error); });
      }
    }, (error)=>{console.log(error);});
  }
}
