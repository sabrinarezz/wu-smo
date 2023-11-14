import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiversService {

  constructor( private afs: AngularFirestore ) { }

  saveData(data: any) {
    this.afs.collection('receivers').add(data).then(docRef => {
      console.log(docRef);
      // this.toastr.success("Data Added Successfully!")
    })
    .catch( err => {
      console.error(err);
    })
  }

  loadData() {
    return this.afs.collection('receivers').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, data }
      })
    }))
  }

  loadReceiver(rId: string) {
    console.log(rId);
    return this.afs.doc(`receivers/${rId}`).valueChanges();
  }

  updateData( id: any, editData: any ) {
    console.log("updateData: ", editData);
    this.afs.collection('receivers').doc(id).update(editData).then(docRef => {
      console.log("Updated!")
      // this.toastr.success('Data Updated Successfully!');
    })
    .catch( err => {
      console.log(err);
    })
  }

  DeleteData( id: any ) {
    this.afs.collection('receivers').doc(id).delete().then(docRef => {
      console.log('Deleted');
      // this.toastr.success('Data Deleted Successfully!');
    });
  }
}
