import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ComponentsModule } from '../components/components.module';
import { ImageProvider } from '../providers/image/image';
import { Camera } from '@ionic-native/camera';
import { WebServiceProvider } from '../providers/web-service/web-service';
import { HttpModule } from '@angular/http';
import { AlertControlProvider } from '../providers/alert-control/alert-control';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp), ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen, Camera, HttpModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImageProvider,
    WebServiceProvider,
    AlertControlProvider
  ], 
  exports:[ComponentsModule]
})
export class AppModule {}
