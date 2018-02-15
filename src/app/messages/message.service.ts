import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { Message } from './models/message';

@Injectable()
export class MessageService {
  constructor(private afs: AngularFirestore) {}

  addMessage(data: Message) {
    return this.afs
      .collection('messages')
      .add({ ...data })
      .then(docRef => {
        this.afs.doc(`messages/${docRef.id}`).update({ id: docRef.id });
      });
  }

  getMessages(): Observable<any> {
    return this.afs.collection('messages/').valueChanges();
  }
}
