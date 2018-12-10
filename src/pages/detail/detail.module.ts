import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPage } from './detail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailPage),ComponentsModule
  ],
  exports:[
    ComponentsModule
  ]
})
export class DetailPageModule {}
