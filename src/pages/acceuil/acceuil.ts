import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

public isLiked(a : string) {      
  let id = parseInt(a);
  if(this.likedArticles.indexOf(id) != -1)
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
      let idInt : number = parseInt(id);
      this.likedArticles.push(idInt);
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


  clicked(){
    console.log("clicked");
  }

  
}
