import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  /**Communication avec le backend REST */
  apiUrl = "http://horizonapp.fr/api/articles";

  constructor(public http: HttpClient, public alertCtrl : AlertController) {
    console.log('Hello RestProvider Provider');
  }

  /** Fonction de récupération des articles GET */
  getArticles(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        resolve(data);
      }), err => {
        console.log(err);
      }
    });
  }

  getArticlesByLimits(a : number){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+"/"+a).subscribe(data => {
        resolve(data);
      }), err => {
        console.log(err);
      }
    });
  }


  /** Fonction pour enregistrer un utilisateur dans la base de données , PARA : id utilisateur et nom utilisateur*/
  postUser(idp: any, nomp: any, picturep : any){
    return new Promise(resolve => {
      this.http.post(this.apiUrl+"/postuser", {id : idp, nom: nomp, picture : picturep}, {headers: {'Content-Type': 'application/json'}})
      .subscribe(data => {
        resolve(data);
      }), err => {
      console.log(err);
      }
    });
  }

  /** Fonction de partage normal, utilisateur sans badge , id de l'utilisateur et le link de l'article PEUT ETRE AMELIORE */
  doShare(id: any, link: any){
    return new Promise(resolve => {
      this.http.post(this.apiUrl+"/InsertShare", ('id='+id+'&link='+link), {headers: {'Content-Type' : 'application/x-www-form-urlencoded'}})
      .subscribe(data => {
        resolve(data);
      }), err =>{
        console.log(err);
      }
    });
  }

  /** Fonction de like normal, utilisateur sans badge, id de l'utilisateur et le link de l'article PEUT ETRE AMELIORE */
  doLike(id: any, link: any){
    return new Promise(resolve => {
      this.http.post(this.apiUrl+"/InsertLike", ('id='+id+'&link='+link), {headers: {'Content-Type' : 'application/x-www-form-urlencoded'}})
      .subscribe(data => {
        resolve(data);
      }), err =>{
        console.log(err);
      }
    });
  }

  /**fonction pour Récupérer tous les likes d'un utilisateur pour la décoration front end, id de l'utilisateur */
  getLike(id : any){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+"/GetLikedArticlesByUser/"+id).subscribe(data => {
        resolve(data);
      }), err => {
        console.log(err);
      }
    });
  }

  /**fonction pour Vérifier si l'utilisateur existe déjà , id de l'utilisateur et son nom*/
  checkUser(id: any, nom: any){
    return new Promise(resolve => {
      this.http.post(this.apiUrl+"/checkuser", ('id='+id+'&nom='+ nom), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .subscribe(data => {
        resolve(data);
      }), err => {
      console.log(err);
      }
    });
  }

  /**Fonction pour récupérer tous les commentaire par rapport à un id d'article */
  getComments(id : any){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+"/getcomment/"+id).subscribe(data => {
        resolve(data);
      }), err => {
        console.log(err);
      }
    });
  }

  /**Function pour ajouter un commentaire de l'utilisateur, paramètres sont déjà parlants */
  doComment(idUtilisateur: any, idArticle : any, commentaire :any ){
    return new Promise(resolve => {
      this.http.post(this.apiUrl+"/postcomment", ('idUtilisateur='+idUtilisateur+'&idArticle='+ idArticle+'&contenu='+commentaire), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .subscribe(data => {
        resolve(data);
      }), err => {
      console.log(err);
      }
    });
  }
  /*recupérer les badges de l'utilisateur*/
  getScores(id: any){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+"/userscores/"+id)
      .subscribe(data => {
        resolve(data);
      }), err =>{
        console.log(err);
      }
    });
  }
}
