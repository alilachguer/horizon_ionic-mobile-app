import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Article } from '../../classes/Article';
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
  articles : Article[] = [] ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profil = navParams.get('profil');
    this.articles.push(new Article("test title", "test link", "test description"));
    this.articles.push(new Article("test title2", "test link2", "test description2"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcceuilPage');
  }

  clicked(){
    console.log("clicked");
  }
}
