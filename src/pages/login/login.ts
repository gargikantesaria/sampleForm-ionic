import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebServiceProvider } from '../../providers/web-service/web-service';
import { AlertControlProvider } from '../../providers/alert-control/alert-control';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm:FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder:FormBuilder, private webServiceProvider:WebServiceProvider, private alert:AlertControlProvider) {
    this.loginForm = this.formBuilder.group({
      'userEmail':['', Validators.required],
      'userPassword':['', Validators.required]
    })
  }

  goToDetail(){
    let data:any = {};
    if(this.loginForm.valid){
      data.userEmail = this.loginForm.value.userEmail;
      data.userPassword = this.loginForm.value.userPassword;
      this.webServiceProvider.callPost('loginUser', data).then((res:any) => {
        localStorage.setItem('userId', res.data._id);
        this.navCtrl.setRoot('DetailPage');
      }).catch((err) => {
        this.alert.showErrorAlert(err);
      })   
    } else {
      this.alert.showAlert("Please fill the required details.")
    }
  }
  goToSignUp(){
    this.navCtrl.setRoot(HomePage);
  }

  forgotPassword(){
    this.navCtrl.push('ForgotPasswordPage');
  }
}
