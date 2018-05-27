import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { ProfilPage} from '../../pages/profil/profil';
import { CommentsPage } from '../comments/comments';
/**
 * Generated class for the AcceuilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
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

isLiked(a : string) {      
  let id = parseInt(a);
  if(this.likedArticles.indexOf(id) != -1)
  return true;
  else return false;      
}

clic(article){
  window.open(article.Link);
  console.log(article.Link);
}

like(link, id){
  let idInt : number = parseInt(id);
  this.likedArticles.push(idInt);
  this.rest.doLikeBadge(this.profil.id, link)
  .then(data => {
    if(JSON.stringify(data) == 'true'){
      console.log("Like ok !! ");
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

  share(link){
   this.rest.doShareBadge(this.profil.id, link)
   .then(data => {
    console.log("data");
   })
   try{
    this.facebook.share(link)
   }catch{
    let alert = this.alertCtrl.create({
      title: 'Partage',
      subTitle: 'Votre article n\' pas été partagé ! Connexion mauvaise ? :\'(',
      buttons: ['Dommage']
    });
    alert.present();
   }
  }

  dislike(id){
    this.navCtrl.push(ProfilPage, { idArticle : id , idUtilisateur : this.profil.id});
  }

  getArticles(){
    this.rest.getArticles()
    .then(data => {
      this.articles = data; 
    })
  }

  readComments(id : any){
    this.navCtrl.push( CommentsPage , {id : id} );
  }

  getLiked(id : any){
    this.rest.getLike(id)
    .then(data => {
      this.likedArticles = JSON.parse(JSON.stringify(data));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcceuilPage');
  }
}
