import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image/image';
import { WebServiceProvider } from '../../providers/web-service/web-service';
import { AlertControlProvider } from '../../providers/alert-control/alert-control';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public registationForm: FormGroup; imgPreview; showDetails: boolean = false; userDetail; imageSet: boolean = false;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private alertCtrl: AlertController, private camera: Camera, private imageProvider: ImageProvider, private webService: WebServiceProvider, private alert:AlertControlProvider) {
    this.registationForm = this.formBuilder.group({
      'userName': ['', Validators.required],
      'userEmail': ['', Validators.required],
      'userPassword': ['', Validators.required],
      'userpicture': [''],
      'userGender': ['female', Validators.required],
      'seasons': ['summer', Validators.required],
    })
    this.imgPreview = "/assets/imgs/logo.png";
  }

  getPhoto() {
    this.alertCtrl.create({
      title: 'Profile Picture',
      message: 'From where do you want to choose your profile pic?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Choose from gallery',
          handler: () => {
            // Call imageProvider to process, upload, and update user photo.
            this.imageProvider.setProfilePhoto('', this.camera.PictureSourceType.PHOTOLIBRARY).then(data => {
              // this.userDetail.image = data;
              this.imgPreview = data;
              this.imageSet = true;
            });
          }
        },
        {
          text: 'Take my photo',
          handler: () => {
            // Call imageProvider to process, upload, and update user photo.
            this.imageProvider.setProfilePhoto('', this.camera.PictureSourceType.CAMERA).then(data => {
              // this.userDetail.image = data;
              this.imgPreview = data;
              this.imageSet = true;
            });
          }
        }
      ]
    }).present();
  }

  onSubmit() {
    console.log("Form value", this.registationForm, this.registationForm.valid)
    let data: any = {};
    if (this.registationForm.valid) {
      data.userEmail = this.registationForm.value.userEmail;
      data.userPassword = this.registationForm.value.userPassword;
      data.userName = this.registationForm.value.userName;
      data.userGender = this.registationForm.value.userGender;
      data.seasons = this.registationForm.value.seasons;
      (this.imageSet) ? data.userpicture = this.imgPreview : null;

      this.webService.callPost('addDetails', data).then((res: any) => {
        this.registationForm.reset();
        this.alert.showAlert(res.body);
        this.navCtrl.setRoot('LoginPage');
        // this.imgPreview = "/assets/imgs/logo.png";
        // console.log(res.data._id);
        // this.getUserDetail(res.data._id);
      }).catch((err) => {
        this.alert.showErrorAlert(err);
      })
    }
    else{
      this.alert.showAlert("Please fill the required details.")
    }
  }

  // getUserDetail(data){
  //   this.webService.callGet('getDetail', data).then((res:any) => {
  //     this.showDetails = true;
  //     this.userDetail = res.body;
  //   }).catch((err) => {
  //     console.log("gor error from get", err);
  //   })
  // }
  goToLogin() {
    localStorage.removeItem('userId');
    this.navCtrl.setRoot("LoginPage");
  }
  checkEmailExist(event){
    if(event){
      let data ={
        email : this.registationForm.controls['userEmail'].value
      }
      this.webService.callPost('checkUserExist', data).then((res:any) =>{
        console.log("response is", res);
        if(res.isexist){
          this.alert.showAlert("The user with this emailId is already exists. Please try with other email.");
          this.registationForm.controls['userEmail'].reset();
        }
      }).catch(err => { console.log(err) })
    }
  }
}
