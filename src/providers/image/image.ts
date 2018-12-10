import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class ImageProvider {

  private options:CameraOptions = {
    targetWidth: 384,
    targetHeight: 384,
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  constructor(private camera: Camera) {
    console.log('Hello ImageProvider Provider');
  }

  setProfilePhoto(name, sourceType): Promise<any>{
    return new Promise((resolve, reject) => {
      this.options.sourceType = sourceType;
      this.camera.getPicture(this.options).then((res) => {
        console.log("response from camera is", res);
        let base64Image = 'data:image/jpeg;base64,' + res;
        //let base64Image = res;
        resolve(base64Image);
      }).catch((err) => {
        console.log("error is", err);
        reject(err);
      })
    })
  }
}
