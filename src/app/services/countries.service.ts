import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor( private afs: AngularFirestore ) { }

  getCountry() {
    return this.afs.collection('countries').get();
  }

  // getData( cId: string ) {
  //   return this.afs.doc(`countries/${cId}`).valueChanges();
  // }

  loadData() {
    return this.afs.collection('countries').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, data }
      })
    }))
  }

  loadCountry(rId: string) {
    console.log(rId);
    return this.afs.doc(`countries/${rId}`).valueChanges();
  }
}
