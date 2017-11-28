import { Component} from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(private geolocation: Geolocation, public alertCtrl: AlertController, public http: Http, public toastCtrl: ToastController) {
  }

  // result:Array<Object>; 
  result:any; 

  private call_door(){
    // var response = this.http.get(this.my_url())
    // .map(res => res.json()
    // );

    // // return this.result;
    // return console.log(response.subscribe(val => {
    //   console.log(val);

    //     let t = this.toastCtrl.create({
    //       // closeButtonText: 'Ok',
    //       // showCloseButton: true,
    //       duration: 2000,
    //       message: val.status,
    //       position: 'botton'
    //   });

    //   t.present()

    // }));

    var latiAtu: any;
    var longAtu: any;
    
    this.geolocation.getCurrentPosition().then((resp) => {
      // var latitude = -20.5245658;
      // var longitude = -47.411794;
      // let latitude = -20.5251219; // de cima do apto
      // let longitude = -47.4119142;

      let latitude = -20.5251526; // do portao
      let longitude = -47.4118106;

      let distancia = (lat1,lon1,lat2,lon2) => {
        var R = 6371;
        var dLat = (lat2-lat1) * (Math.PI/180);
        var dLon = (lon2-lon1) * (Math.PI/180);
        var a =
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) *
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d;
      }      

      latiAtu = resp.coords.latitude;
      longAtu = resp.coords.longitude;
      // latitude = latiAtu;
      // longitude = longAtu;

      if (distancia(latitude, longitude, latiAtu, longAtu) >= 0.015)  {

        let t = this.toastCtrl.create({
          // closeButtonText: 'Ok',
          // showCloseButton: true,
          duration: 2000,
          // message: 'N' + latiAtu+ ' ' + longAtu + ' ' + latitude + ' ' + longitude + ' ' + distancia(latitude, longitude, latiAtu, longAtu),
          message: 'Distancia maior do que 15m',
          position: 'botton'
        });

        t.present()        

        console.log('é longe meu', latiAtu, longAtu, latitude, longitude)
      }
      else
      {

        var response = this.http.get(this.my_url())
        .map(res => res.json()
        );

        console.log('pertim', latiAtu, longAtu, latitude, longitude, distancia(latitude, longitude, latiAtu, longAtu));

        // let t = this.toastCtrl.create({
        //   // closeButtonText: 'Ok',
        //   // showCloseButton: true,
        //   duration: 2000,
        //   message: 'S' + latiAtu+ ' ' + longAtu + ' ' + latitude + ' ' + longitude + ' ' + distancia(latitude, longitude, latiAtu, longAtu),
        //   position: 'botton'
        // });

        // t.present()  

        // return this.result;
        return console.log(response.subscribe(val => {
          console.log(val);

            let t = this.toastCtrl.create({
              duration: 2000,
              message: val.status,
              position: 'botton'
          });

          t.present()

        }));        
        
      };
    }).catch((error) => {
      let t = this.toastCtrl.create({
        duration: 2000,
        message: "Erro capturando distância",
        position: 'botton'
      });

      t.present()  

       console.log('Error getting location', error);
     });
  }

  private my_url(): string {
      // return 'http://edmgold.duckdns.org:8899/testeportao';
      return 'http://edmgold.duckdns.org:8899/abrirportao';
  }

  showConfirm() {
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