import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AcceuilPage } from '../pages/acceuil/acceuil';
import { ProfilPage} from '../pages/profil/profil';

import { Facebook } from '@ionic-native/facebook';
import { FacebookProvider } from '../providers/facebook/facebook';
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AcceuilPage,
    ProfilPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    AcceuilPage,
    ProfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FacebookProvider,
    RestProvider
  ]
})
export class AppModule {}
