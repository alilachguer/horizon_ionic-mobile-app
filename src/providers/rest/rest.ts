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

  apiUrl = "http://umontpelliertesting.somee.com/api/articles";

  constructor(public http: HttpClient, public alertCtrl : AlertController) {
    console.log('Hello RestProvider Provider');
  }

  getArticles(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        resolve(data);
      }), err => {
        console.log(err);
      }
    });
  }

  postUser(id: any, nom: any){
    return new Promise(resolve => {
      this.http.post(this.apiUrl+"/postuser", ('id='+id+'&nom='+ nom), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .subscribe(data => {
        resolve(data);
      }), err => {
      console.log(err);
      }
    });
  }

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

  getLike(id : any){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+"/GetLikedArticlesByUser/"+id).subscribe(data => {
        resolve(data);
      }), err => {
        console.log(err);
      }
    });
  }

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

  getComments(id : any){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+"/getcomment/"+id).subscribe(data => {
        resolve(data);
      }), err => {
        console.log(err);
      }
    });
  }

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
}
