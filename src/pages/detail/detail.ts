import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WebServiceProvider } from '../../providers/web-service/web-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageProvider } from '../../providers/image/image';
import { Camera } from '@ionic-native/camera';
import { AlertControlProvider } from '../../providers/alert-control/alert-control';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  showDetails: boolean = true;
  userDetail; imgPreview;
  editUserForm: FormGroup; imageSet: Boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private webServiceProvider: WebServiceProvider, private formBuilder: FormBuilder, private alertCtrl: AlertController, private imageProvider: ImageProvider, private camera: Camera, private alert: AlertControlProvider) {
    this.editUserForm = this.formBuilder.group({
      'userName': ['', Validators.required],
      'userMobile': ['', Validators.required],
      'userEmail': ['', Validators.required],
      'userpicture': [''],
      'userGender': ['female', Validators.required],
      'seasons': ['summer', Validators.required],
    })
    this.editUserForm.controls['userEmail'].disable();
    this.editUserForm.controls['userMobile'].disable();
    this.imgPreview = "/assets/imgs/logo.png";
  }

  ionViewDidLoad() {
    let id = localStorage.getItem('userId');
    this.webServiceProvider.callGet('getDetail', id).then((res: any) => {
      this.showDetails = true;
      this.userDetail = res.body;
      (!res.body.userpicture) ? (this.userDetail.userpicture = this.imgPreview) : null;
      this.editUserForm.patchValue({
        'userName': (this.userDetail.userName ? this.userDetail.userName : ''),
        'userEmail': ((this.userDetail.userEmail ? this.userDetail.userEmail : '')),
        'userpicture': (this.userDetail.userpicture ? this.userDetail.userpicture : null),
        'userGender': (this.userDetail.userGender ? this.userDetail.userGender : 'female'),
        'seasons': (this.userDetail.seasons ? this.userDetail.seasons : 'monsoon'),
        'userMobile' : (this.userDetail.userMobile ? this.userDetail.userMobile : '')
      });
    }).catch((err) => {
      this.alert.showErrorAlert(err);
    })

  }
  onSubmit() {
    let data: any = {};
    if (this.editUserForm.valid) {
      if (this.userDetail.userpicture != this.editUserForm.value.userpicture) {
        data.userpicture = this.userDetail.userpicture;
        this.editUserForm.patchValue({ userpicture: data.userpicture });
      }
      data.userName = this.editUserForm.value.userName;
      data.userGender = this.editUserForm.value.userGender;
      data.seasons = this.editUserForm.value.seasons;
      data.id = localStorage.getItem('userId');

      this.webServiceProvider.callPost('editUserDetail', data).then((res:any) => this.alert.showAlert(res.body)).catch((err) => {
        this.alert.showErrorAlert(err);
      })
    } else {
      this.alert.showAlert("Please fill the required details.")
    }

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
              this.userDetail.userpicture = data;
            });
          }
        },
        {
          text: 'Take my photo',
          handler: () => {
            // Call imageProvider to process, upload, and update user photo.
            this.imageProvider.setProfilePhoto('', this.camera.PictureSourceType.CAMERA).then(data => {
              this.userDetail.userpicture = data;
            });
          }
        }
      ]
    }).present();
  }
  onSignIn() {
    localStorage.removeItem('userId');
    this.navCtrl.setRoot("LoginPage");
  }
}
