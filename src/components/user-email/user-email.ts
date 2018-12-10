import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'user-email',
  templateUrl: 'user-email.html'
})
export class UserEmailComponent {

  @Input() parentForm:FormGroup;
  @Input() formControlNameValue: string;
  @Output() isExist = new EventEmitter<any>();
  isValid:boolean;
  isTouched:boolean;

  constructor() {}

  elementChanged(event){
    if(event) {
      const test = this.test( event._value );
      this.isValid = test;
      this.isTouched = !test;
      this.isExist.emit(this.isValid);
    }
  }

  test(inputData){
    const TEST_EXPRESSION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
     return TEST_EXPRESSION.test(inputData);
  }

}
