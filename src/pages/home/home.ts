import { Component} from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(public alertCtrl: AlertController, public http: Http, public toastCtrl: ToastController) {
  }

  // result:Array<Object>; 
  result:any; 


  private callApi(){
    return this.http.get(this.my_url());
  }

  private call_door(){
    // const headerDict = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Request-Method': '*',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    // }

    // const headerObj = {                                                                                                                                                                                 
    //   headers: new Headers(headerDict), 
    // };


    var response = this.http.get(this.my_url())
    .map(res => res.json()
    );

    // return this.result;
    return console.log(response.subscribe(val => {
      console.log(val);

        let t = this.toastCtrl.create({
          closeButtonText: 'Ok',
          showCloseButton: true,
          message: val.status,
          position: 'botton'
      });

      t.present()

    }));

  }

  private my_url(): string {
      return 'http://edmgold.duckdns.org:8899/testeportao';
  }

  showConfirm() {
    let msg: string;

    let confirm = this.alertCtrl.create({
      title: 'Portão Lumiere II B',
      message: 'Deseja abrir o portão agora?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            console.log('Agree clicked');
            // presentToast(this.callApi());
            console.log(this.call_door());
        }
        }
      ]
    });
    confirm.present();
  }

    presentToast(msg: string) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000
      });
      toast.present();
    }

}