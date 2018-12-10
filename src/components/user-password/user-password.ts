import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'user-password',
  templateUrl: 'user-password.html'
})
export class UserPasswordComponent {

  @Input() parentForm:FormGroup;
  @Input() formControlNameValue: String;
  isValid:boolean;
  isTouched:boolean;  

  constructor() { }

  elementChanged(event){
    console.log("event we got is", event._value);
    if(event){
      let test = this.test(event._value);
      this.isValid = test;
      this.isTouched = !test;
    }
  }

  test(inputData){
    if(inputData.length >= 5) {
      return true;
    }
    else{
      return false;
    }
  }

}
