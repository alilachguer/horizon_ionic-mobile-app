import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  idArticle : any; 
  idUtilisateur : any;
  commentaire : string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,public rest : RestProvider, public alertCtrl : AlertController) {
    this.idArticle = navParams.get('idArticle');
    this.idUtilisateur = navParams.get('idUtilisateur')
  }

  onChangeTime(content){
    this.commentaire = content;
  }

  public enregistrer(){
      this.rest.doComment(this.idUtilisateur, this.idArticle, this.commentaire)
      .then(data => {     
        this.navCtrl.pop();  
      })
      let alert = this.alertCtrl.create({
        title: 'Message',
        message: 'votre commentaire a été ajouté avec succès !',
        buttons: [
          {
            text: 'Cooool',
          }
        ]
        });
        alert.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

}
