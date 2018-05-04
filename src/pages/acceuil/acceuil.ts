import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { FacebookProvider } from '../../providers/facebook/facebook';

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
  test : string; 

constructor(public navCtrl: NavController, public navParams: NavParams, public rest : RestProvider, 
  private alertCtrl : AlertController, public facebook : FacebookProvider ) {
  this.profil = navParams.get('profil');
  this.getArticles();
}

private clic(article){
  window.open(article.Link);
  console.log(article.Link);
}

private like(link){
  let alert = this.alertCtrl.create({
    title: 'New Friend!',
    subTitle: 'Link your gonna like  : ' +link,
    buttons: ['OK']
  });
  alert.present();
}

private unLike(article){
  article.Score -= 1;
  console.log(article.Score);
}

  private share(link){
   this.rest.doShare(this.profil.id, link)
   .then(data => {
    console.log("data");
   })
   try{
    this.facebook.share(link)
    let alert = this.alertCtrl.create({
      title: 'Partage',
      subTitle: 'Votre article a été partagé avec succès!',
      buttons: ['Cool']
    });
    alert.present();
   }catch{
    let alert = this.alertCtrl.create({
      title: 'Partage',
      subTitle: 'Votre article n\' pas été partagé ! Connexion mauvaise ? :\'(',
      buttons: ['Dommage']
    });
    alert.present();
   }
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
