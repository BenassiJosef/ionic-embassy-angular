import { Component, ViewChild, ElementRef } from '@angular/core';
// import { LaunchNavigator} from '@ionic-native/launch-navigator';
import { Artist } from '../../model/artist.model';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import { LoadingController } from 'ionic-angular';
import { Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {

  getAllArtists: Subscription;
  artists: Artist[];
  @ViewChild("map") mapElement;
  @ViewChild("info") infoElement :ElementRef;
  map:any;

  
  constructor( private firebase: FirebaseProvider,public loading: LoadingController) {
    
  }
  ngOnInit(){
    let loader = this.loading.create({
      content: 'Loading...Please Wait',
    });

    loader.present().then(() => {
      this.initMap();
      loader.dismiss();
    });
  }

  initMap(){

    let alexCoords = new google.maps.LatLng(55.980511, -3.179788);
    
    let mapOptions: google.maps.MapOptions = {
      center: alexCoords,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map= new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.getAllArtists = this.firebase.getArtists().subscribe(artists =>{
      this.artists = artists; 
      this.artists.forEach(artist => {

          var marker = new google.maps.Marker({
          position: new google.maps.LatLng(artist.lat,
          artist.lng),
          map: this.map,
          title: ""
      });

    var window = new google.maps.InfoWindow({
      content: " "
    });
      google.maps.event.addListener(marker, 'click', function() {
        window.setContent('<p>Event Name: '+ artist.name +'</p>');
        window.open(this.artist, marker);
        });
      });
    });
  }

  ionWillLeave(){

    this.getAllArtists.unsubscribe();
  }
}


  


  
