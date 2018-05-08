import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  listComments : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest : RestProvider) {
     this.getComments(navParams.get("id"));
  }

  getComments(id : any){
    this.rest.getComments(id)
    .then(data =>{
      this.listComments = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }

}
