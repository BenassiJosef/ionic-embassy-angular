import { Injectable } from '@angular/core';
import { Artist } from '../../model/artist.model';
import { Featured } from '../../model/featured.model';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  
  artistsCollection: AngularFirestoreCollection<Artist>; //Firestore collection
  artists: Observable<Artist[]>;

  featuredCollection: AngularFirestoreCollection<Featured>; //Firestore collection
  featured: Observable<Featured[]>;
  
  constructor(private afs: AngularFirestore) {
    this.artistsCollection = this.afs.collection('artist'); //ref()
    this.artists = this.artistsCollection.valueChanges();

    this.featuredCollection = this.afs.collection('featured-artist'); //ref()
    this.featured = this.featuredCollection.valueChanges();
  }
  
  
  getArtists() {
    return this.artists;
}

getFeatured() {
  return this.featured;
}


}
