import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController} from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { FacebookProvider } from '../providers/facebook/facebook';
import { RestProvider } from '../providers/rest/rest';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: NavController // <--- Reference to the Nav
  rootPage:any = HomePage;
  userProfile : any; 
  userScores : any[];

  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen, private facebook : FacebookProvider, private rest : RestProvider
              ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.fbLogin();
    });
  }

  public fbLogin(){
    this.facebook.login().subscribe((connected)=>{   //On surveille l'observable afin de récupérer le status de connection
      if(connected === true){
        this.facebook.getProfile().subscribe((profile)=>{   //Si connecté, on récupére le profil
          this.userProfile = profile;
          this.rest.getScores(this.userProfile.id)
          .then(data => {
            this.userScores = JSON.parse(JSON.stringify(data));
          })
        }, (error)=>{console.log(error); });
      }
    }, (error)=>{console.log(error);});
  }
}

  


