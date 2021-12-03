import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Event} from '../models/Event';
import {AngularFirestore} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private static readonly ROOT_ENDPOINT = 'events';

  constructor(private db: AngularFirestore) { }

  getEvents(): Observable<Event[]> {
    return this.db.collection(EventService.ROOT_ENDPOINT).snapshotChanges().pipe(map(docArray => {
      return docArray.map((doc: any) => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
          /* Same as
             name: doc.payload.doc.data().name,
             date: doc.payload.doc.data().date,
             description: doc.payload.doc.data().description,
          */
        };
      });
    }));
  }

  createEvent(event: Event): any {
    return this.db.collection(EventService.ROOT_ENDPOINT).add(event);
  }

  getEventById(id: string): any {
    return this.db.collection(EventService.ROOT_ENDPOINT).doc(id).ref.get().then((doc) => doc.data());
  }

  updateEvent(event: Event): any {
    return this.db.doc(EventService.ROOT_ENDPOINT + '/' + event.id).set(event);
  }

  deleteEvent(id: string): any {
    return this.db.doc(EventService.ROOT_ENDPOINT + '/' + id).delete();
  }
}
