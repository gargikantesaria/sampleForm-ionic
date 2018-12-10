import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class WebServiceProvider {

  constructor(public http: Http, private loadingCtrl:LoadingController) {
    console.log('Hello WebServiceProvider Provider');
  }
  
  callPost(url,data){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // let options = new RequestOptions({ headers: headers });
    let load = this.loadingCtrl.create({});
    load.present();

    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:5000/api/' + url, data).map((res) => res.json()).subscribe((data) => {
        load.dismiss();
        resolve(data);
      }, (err) => {
        load.dismiss();
        reject(JSON.parse(err._body).error);
      })
    })
  }

  callGet(url,data) {
    var headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');
    // var options = new RequestOptions({ headers : headers });
    var load = this.loadingCtrl.create({});
    load.present();

    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:5000/api/' + url + '?id=' + data).map(res => res.json()).subscribe((res) => {
        load.dismiss();
        resolve(res);
      }, (err) => {
        load.dismiss();
        reject(JSON.parse(err._body).error);
      })
    })
  }

}
