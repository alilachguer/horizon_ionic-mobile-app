import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = "http://umontpelliertesting.somee.com/api/articles";

  constructor(public http: HttpClient) {
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
}
