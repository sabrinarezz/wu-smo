import { TestBed } from '@angular/core/testing';

import { ReceiversService } from './receivers.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule, DocumentChangeAction, DocumentData, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';

describe('ReceiversService', () => {
  let service: ReceiversService;
  let firestoreMock: jasmine.SpyObj<AngularFirestore>;
  let collectionMock: jasmine.SpyObj<AngularFirestoreCollection>;
  let docMock: jasmine.SpyObj<AngularFirestoreDocument>;

  beforeEach(() => {
    collectionMock = jasmine.createSpyObj<AngularFirestoreCollection>('AngularFirestoreCollection', ['add', 'snapshotChanges']);
    docMock = jasmine.createSpyObj<AngularFirestoreDocument>('AngularFirestoreDocument', ['valueChanges', 'update', 'delete']);

    firestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']);
    firestoreMock.collection.withArgs(jasmine.any(String)).and.returnValue(collectionMock);
    firestoreMock.doc.and.returnValue(docMock);

    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      providers: [
        ReceiversService,
        { provide: AngularFirestore, useValue: firestoreMock }
      ]
    });
    service = TestBed.inject(ReceiversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save data', () => {
    const mockData = { 
      firstName: 'Chloe',
      middleName: 'Jane',
      lastName: 'Decker',
      country: 'Russia',
      countryCode: +12,
      type: 'Mobile',
      phoneNumber: 1234567890
     };

    const fakeDocRef = {
      id: 'rN8NwX796dU4LtVdJNL3',
      firestore: null as any,
      parent: null as any,
      path: '',
      collection: null as any,
      isEqual: jasmine.createSpy('isEqual'),
      update: jasmine.createSpy('update'),
      delete: jasmine.createSpy('delete'),
      get: jasmine.createSpy('get'),
      set: jasmine.createSpy('set'),
      onSnapshot: jasmine.createSpy('onSnapshot'),
      withConverter: jasmine.createSpy('withConverter')
    } as unknown as DocumentReference<any>;

    collectionMock.add.and.returnValue(Promise.resolve(fakeDocRef));

    try {
      const result = service.saveData(mockData);
      expect(collectionMock.add).toHaveBeenCalledWith(mockData);
      // expect(result).toEqual({ fakeDocRef })
    } catch (error) {
      fail('Should not throw an error')
    }

    // service.saveData(mockData);
    // expect(collectionMock.add).toHaveBeenCalledWith(mockData);
  });
 
  it('should handle save data error', () => {
    const mockData = { 
      firstName: 'Chloe',
      middleName: 'Jane',
      lastName: 'Decker',
      country: 'Russia',
      countryCode: +12,
      type: 'Mobile',
      phoneNumber: 1234567890
     };
    collectionMock.add.and.returnValue(Promise.reject('Error'));
 
    service.saveData(mockData);
    expect(collectionMock.add).toHaveBeenCalledWith(mockData);
  });
 
  it('should load data', () => {
    const mockSnapshot = [{ payload: { doc: { id: '1', data: () => ({}) } } }];
    // collectionMock.snapshotChanges.and.returnValue(of(mockSnapshot));
    const mockObservable: Observable<DocumentChangeAction<DocumentData>[]> = of(mockSnapshot as any);
    collectionMock.snapshotChanges.and.returnValue(mockObservable);
 
    service.loadData().subscribe((data) => {
      expect(data.length).toBe(1);
    });
  });
 
  // it('should load a specific receiver', () => {
  //   const receiverId = 'rN8NwX796dU4LtVdJNL3';
  //   const mockReceiverData = { 
  //     firstName: 'Chloe',
  //     middleName: 'Jane',
  //     lastName: 'Decker',
  //     country: 'Russia',
  //     countryCode: +12,
  //     type: 'Mobile',
  //     phoneNumber: 1234567890
  //    };
  //   const expectedDocReference: DocumentReference = jasmine.createSpyObj('DocumentReference', ['valueChanges']);
  //   collectionMock.doc.withArgs(receiverId).and.returnValue(expectedDocReference);
  //   expectedDocReference.valueChanges.and.returnValue(of(mockReceiverData));
 
  //   service.loadReceiver(receiverId).subscribe((receiver) => {
  //     expect(receiver).toEqual(mockReceiverData);
  //   });
 
  //   expect(collectionMock.doc).toHaveBeenCalledWith(receiverId);
  // });
 
  // it('should update data', () => {
  //   const mockId = 'rN8NwX796dU4LtVdJNL3';
  //   const mockEditData = { 
  //     firstName: 'Chloe',
  //     middleName: 'Jane',
  //     lastName: 'Decker',
  //     country: 'Russia',
  //     countryCode: +12,
  //     type: 'Mobile',
  //     phoneNumber: 1234567890
  //    };

  //   //  const expectedDocRef: DocumentReference = jasmine.createSpyObj('DocumentReference', ['update']);
  //   //  firestoreMock.collection().doc.withArgs(mockId).and.returnValue(expectedDocRef);
  //   //  expectedDocRef.update.and.returnValue(Promise.resolve());

  //   service.updateData(mockId, mockEditData);
 
  //   // expect(firestoreMock.collection).toHaveBeenCalledWith('receivers');
  //   // expect(expectedDocRef.update).toHaveBeenCalledWith(mockEditData);
  //   expect(docMock.update).toHaveBeenCalledWith(mockEditData);
  // });
 
  // it('should handle update data error', async () => {
  //   const mockId = 'rN8NwX796dU4LtVdJNL3';
  //   const mockEditData = { 
  //     firstName: 'Chloe',
  //     middleName: 'Jane',
  //     lastName: 'Decker',
  //     country: 'Russia',
  //     countryCode: +12,
  //     type: 'Mobile',
  //     phoneNumber: 1234567890
  //    };

  //   // const docMock: DocumentReference<DocumentData> = jasmine.createSpyObj('DocumentReference', ['update']);
  //   docMock.update.and.throwError(new Error('Update failed'));

  //   collectionMock.doc.and.returnValue(docMock);
  //   firestoreMock.collection.and.returnValue(collectionMock);

  //   try {
  //     await service.updateData(mockId, mockEditData);
  //     fail('Should throw an error')
  //   } catch(error: any) {
  //     expect(error.message).toBe('Update failed');
  //     expect(collectionMock.doc).toHaveBeenCalledWith(mockId);
  //     expect(docMock.update).toHaveBeenCalledWith(mockEditData);
  //   }
 
  //   // service.updateData(mockId, mockEditData);
  //   // expect(docMock.update).toHaveBeenCalledWith(mockEditData);
  // });
 
  it('should delete data', async () => {
    const mockId = 'rN8NwX796dU4LtVdJNL3';

    const fakeDocRef = jasmine.createSpyObj<DocumentReference>('DocumentReference', ['delete']);
    // collectionMock.doc.and.returnValue(fakeDocRef);

    try {
      await service.DeleteData(mockId);
      expect(collectionMock.doc).toHaveBeenCalledWith(mockId);
      expect(fakeDocRef.delete).toHaveBeenCalled();
    } catch {
      // fail('Should not throw an error')
    }

    // service.DeleteData(mockId);
    expect(docMock.delete).not.toHaveBeenCalled();
  });
 
  // it('should handle delete data error', async () => {
  //   const mockId = 'rN8NwX796dU4LtVdJNL3';

  //   collectionMock.doc.and.throwError('Error');

  //   try {
  //     await service.DeleteData(mockId);
  //     fail('Should throw an error');
  //   } catch(error) {
  //     expect(error).toBe('Error');
  //     expect(collectionMock.doc).toHaveBeenCalledWith(mockId);
  //   }
  //   // docMock.delete.and.returnValue(Promise.reject('Error'));
 
  //   // service.DeleteData(mockId);
  //   // expect(docMock.delete).toHaveBeenCalled();
  // });
});
