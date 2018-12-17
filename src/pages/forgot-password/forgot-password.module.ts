import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotPasswordPage } from './forgot-password';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ForgotPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgotPasswordPage),ComponentsModule
  ],
  exports:[
    ComponentsModule
  ]
})
export class ForgotPasswordPageModule {}
