import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
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
  articles : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest : RestProvider) {
    this.profil = navParams.get('profil');
    this.getArticles();
  }
  
private clic(article){
  window.open(article.Link);
  console.log(article.Link);
}

private like(article){
  article.Score += 1;
  console.log(article.Score);
}

private unLike(article){
  article.Score -= 1;
  console.log(article.Score);
}

private share(article){
  article.Score += 2;
  console.log(article.Score);
}

  getArticles(){
    this.rest.getArticles()
    .then(data => {
      this.articles = data; 
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcceuilPage');
  }

  clicked(){
    console.log("clicked");
  }

  
}
