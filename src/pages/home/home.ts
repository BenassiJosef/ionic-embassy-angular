import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { HomeDetailPage } from '../../pages/home-detail/home-detail';
import { Network } from '@ionic-native/network';
import { Subscription} from 'rxjs/Subscription';
import { LoadingController } from 'ionic-angular';
import { Artist } from '../../model/artist.model';
import 'rxjs/add/operator/map';
import {FirebaseProvider} from '../../providers/firebase/firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // private eventItems:Entry<any>[] = [];  
  // events: Observable<Event[]>

  connected: Subscription;
  disconnected: Subscription;
  getAllArtist: Subscription;
  artists: Artist[];
  constructor(public loading: LoadingController,private toast: ToastController, private network: Network,public navCtrl: NavController, private firebase: FirebaseProvider) {

}
    doRefresh(refresher) {
      console.log('Begin async operation', refresher);

      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
    }

    displayNetworkUpdate(connectionState: string){
      let networkType = this.network.type;
      this.toast.create({
        message: `You are now ${connectionState} via ${networkType}`,
        duration: 3000
      }).present();
    }

    ngOnInit() {
      let loader = this.loading.create({
        content: 'Loading...Please Wait',
      });
  
    loader.present().then(() => {
     this.getAllArtist = this.firebase.getArtists().subscribe(artists =>{
        this.artists = artists;
      });

      loader.dismiss();
    });

    this.connected = this.network.onConnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
   
    this.disconnected = this.network.onDisconnect().subscribe(data => {
      console.log(data)
       this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }

  goArtist(artist){

        console.log(artist.lat,artist.lng);
  }

    ionViewWillLeave(){
      this.connected.unsubscribe();
      this.disconnected.unsubscribe();
      this.getAllArtist.unsubscribe();
    }

    openItem(artist) {
      this.navCtrl.push(HomeDetailPage,{

        artist: artist
      });
    }

}
