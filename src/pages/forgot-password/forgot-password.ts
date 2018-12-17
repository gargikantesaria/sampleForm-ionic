import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebServiceProvider } from '../../providers/web-service/web-service';
import { AlertControlProvider } from '../../providers/alert-control/alert-control';
import PhoneNumber from 'awesome-phonenumber';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  forgotPasswordForm: FormGroup;
  showEmailtext: boolean = true;
  showMobiletext: boolean = false;
  phoneError: boolean = false;
  phoneValid: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private webService: WebServiceProvider,
    private alert: AlertControlProvider) {
    this.forgotPasswordForm = this.formBuilder.group({
      'userEmail': ['', Validators.compose([Validators.email, Validators.required])],
      'userMobile': ['', Validators.required]
    });
  }

  showEmail() {
    this.showEmailtext = true;
    this.showMobiletext = false;
  }
  showMobile() {
    this.showEmailtext = false;
    this.showMobiletext = true;
  }

  submitForm() {
    let data: any = {};

    if (this.showEmailtext && this.forgotPasswordForm.controls['userEmail'].value.length > 0) {
      data.userEmail = this.forgotPasswordForm.controls['userEmail'].value
    } else if (this.showMobiletext && this.forgotPasswordForm.controls['userMobile'].value.length > 0) {
      data.userMobile = this.forgotPasswordForm.controls['userMobile'].value
    }
    if (data.userEmail || data.userMobile) {
      this.webService.callPost('forgotPassword', data).then((res: any) => {
        this.alert.showAlert(res.body);
        this.forgotPasswordForm.reset();
      }).catch((err) => {
        this.alert.showErrorAlert(err);
        this.forgotPasswordForm.reset();
      })
    }
    else {
      this.alert.showAlert("Please fill the details.")
    }
  }
  checkMobile(userMobile) {
    const pn = new PhoneNumber(userMobile.value);
    if ((pn.isValid() && pn.isMobile()) && userMobile.value.length > 0) {
      this.phoneError = false;
      this.phoneValid = true;
    } else {
      this.phoneError = true;
      this.phoneValid = false;
    }

  }

  checkuserExist(event) {
    if (event) {
      let data = {
        email: this.forgotPasswordForm.controls['userEmail'].value
      }
      this.webService.callPost('checkUserExist', data).then((res: any) => {
        if (!res.isexist) {
          this.alert.showAlert("The user with this emailId is not exists. Please try with your registered email.");
          this.forgotPasswordForm.controls['userEmail'].reset();
        }
      }).catch(err => { this.alert.showErrorAlert(err); })
    }
  }

}
