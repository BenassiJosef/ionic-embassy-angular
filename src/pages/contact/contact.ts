import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Featured } from '../../model/featured.model';
import { FirebaseProvider} from '../../providers/firebase/firebase';
import { LoadingController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  getFeatured: Subscription;
  featured: Featured[];
  constructor(public navCtrl: NavController, private loading:LoadingController, private firebase:FirebaseProvider,private youtube: YoutubeVideoPlayer) {

  }

  ngOnInit(){
        
    let loader = this.loading.create({
      content: 'Loading...Please Wait',
    });

  loader.present().then(() => {
   this.getFeatured = this.firebase.getFeatured().subscribe(featured =>{
    this.featured = featured;
    });

    loader.dismiss();
    
  });

  }

  ionWillLeave(){
    this.getFeatured.unsubscribe();
  }

  startVideo() {
  
    this.youtube.openVideo('nQ3f1AnIH18');
  }
 

}
