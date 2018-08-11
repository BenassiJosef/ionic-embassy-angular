import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator} from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import {InAppBrowser ,InAppBrowserOptions} from '@ionic-native/in-app-browser'


/**
 * Generated class for the HomeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-detail',
  templateUrl: 'home-detail.html',
})
export class HomeDetailPage {

  artist: Event;

  constructor(private geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams,public launchNavigator: LaunchNavigator,public alertCtrl: AlertController,private inAppBrowser: InAppBrowser) {

      this.artist = navParams.get('artist');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeDetailPage');
  }

  showDirectionAlert() {
    let alert = this.alertCtrl.create({
      title: 'No directions ',
      subTitle: 'No physical venue for this artist',
      buttons: ['OK']
    });
    alert.present();
  }

  showWebsiteAlert() {
    let alert = this.alertCtrl.create({
      title: 'No Website Availbable',
      subTitle: 'Artist ',
      buttons: ['OK']
    });
    alert.present();
  }

  getDirections(desination :string){
    if( desination == null){
        this.showDirectionAlert();
    } else{

    let coords:any ;
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
     coords = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
    
    }).catch((error) => {
       console.log('Error getting location', error);
     });
    this.launchNavigator.navigate(desination, {
      start: coords
    });
  }
}
  openUrl(url:string){
    const options :InAppBrowserOptions ={
      hardwareback: 'yes'
    }
      if( url == null){
          this.showWebsiteAlert();
      } else{
        this.inAppBrowser.create(url,'_self',options );
      }
  }
}
