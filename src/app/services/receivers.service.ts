import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

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

  // savePay(id: number, value: boolean) {
  //   const db = firebase.firestore();
  //   db.collection('smo').doc(`payIn_${id}`).set({
  //     value: value
  //   }).then(() => {
  //     console.log(id, value);
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }

  saveSmo (data: any) {
    this.afs.collection('smo').add(data).then(docRef => {
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

  loadSMOData() {
    return this.afs.collection('smo').snapshotChanges().pipe(map(actions => {
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
    this.afs.doc(`receivers/${id}`).update(editData).then(docRef => {
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

  async deleteOldData() {
    const duration = 10000;
    const threshold = new Date(Date.now() - duration);

    const senderRef = this.afs.collection('smo', ref => ref.where('timestamp', '<', threshold));
    const receiverRef = this.afs.collection('receivers', ref => ref.where('timestamp', '<', threshold));

    const senderSnapshot = await senderRef.get().toPromise();
    senderSnapshot?.forEach( doc => doc.ref.delete());

    const receiverSnapshot = await receiverRef.get().toPromise();
    receiverSnapshot?.forEach( doc => doc.ref.delete());
  }
}
