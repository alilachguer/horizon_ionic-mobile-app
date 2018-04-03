import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';

/*
  Generated class for the FacebookProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FacebookProvider {

  session : any;

  constructor(public facebook: Facebook) {
    console.log('Hello FacebookProvider Provider');
  }

  public login(){
    //On demande les permissions suivantes: email
    this.facebook.login(['email']).then((response)=>{
      if(response.status === "connected"){
        this.session = response;
        console.log(this.session);
      }
    }, (error)=>{console.log(error);});
  }

}
