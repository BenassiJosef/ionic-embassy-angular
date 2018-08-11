import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HomeDetailPage } from '../pages/home-detail/home-detail';
import { OfflinePage } from '../pages/offline/offline';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContentfulProvider } from '../providers/contentful/contentful';
import { Network } from '@ionic-native/network';
import { ConectionStatusProvider } from '../providers/conection-status/conection-status';
import { GoogleMapComponent} from '../components/google-map/google-map';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator} from '@ionic-native/launch-navigator';
import { FirebaseProvider } from '../providers/firebase/firebase';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';



import { firebaseConfig} from '../credentials';
import { AngularFirestore } from 'angularfire2/firestore';
import { InAppBrowser} from '@ionic-native/in-app-browser'
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    HomeDetailPage,
    OfflinePage,
    GoogleMapComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    // AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    HomeDetailPage,
    OfflinePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContentfulProvider,
    Network,
    ConectionStatusProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    LaunchNavigator,
    FirebaseProvider,
    AngularFirestore,
    InAppBrowser,
    YoutubeVideoPlayer 
  
  ]
})
export class AppModule {}
