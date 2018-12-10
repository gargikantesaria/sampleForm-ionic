
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertControlProvider {

  constructor(private alertCtrl: AlertController) {}

  showAlert(msg){
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: msg,
      buttons:['ok']
    });
    alert.present();
  }

  showErrorAlert(errorMsg){
    let alert = this.alertCtrl.create({
      title: ' Error Alert',
      message: errorMsg,
      buttons:['ok']
    });
    alert.present();

  }

}
