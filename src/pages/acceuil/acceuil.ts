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
  likedArticles : any[]; 

constructor(public navCtrl: NavController, public navParams: NavParams, public rest : RestProvider, 
  private alertCtrl : AlertController, public facebook : FacebookProvider ) {
  this.profil = navParams.get('profil');
  this.getArticles();
  this.getLiked(this.profil.id);
}

private isLiked(a : number) : boolean{
    let index : number = this.likedArticles.indexOf(a);
    if(index != -1 )
    return true; 
    else return false; 
}

private clic(article){
  window.open(article.Link);
  console.log(article.Link);
}

private like(link, id){
  this.rest.doLike(this.profil.id, link)
  .then(data => {
    if(JSON.stringify(data) == 'true'){
      let alert = this.alertCtrl.create({
        title: 'Action',
        subTitle: 'Votre like a bien été pris en compte!',
        buttons: ['Cool']
      });
      alert.present();
      this.likedArticles.push(id);
    }else{
      let alert = this.alertCtrl.create({
        title: 'Action',
        subTitle: 'Votre like n\'a pas été pris en compte! Vous avez déjà liké cet article ?',
        buttons: ['Oh ! Okey ! ']
      });
      alert.present();
    }
  })
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

  getLiked(id : any){
    this.rest.getLike(id)
    .then(data => {
      this.likedArticles = JSON.parse(JSON.stringify(data));
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcceuilPage');
  }

  clicked(){
    console.log("clicked");
  }

  
}
