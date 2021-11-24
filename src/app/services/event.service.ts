import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Event} from '../models/Event';
import {Subject} from 'rxjs/internal/Subject';
import {AuthUser} from '../models/Auth';
import {AngularFirestore} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private static readonly ROOT_ENDPOINT = 'https://crud-app-f7ae8-default-rtdb.europe-west1.firebasedatabase.app/';
  authUser = new Subject<AuthUser>();

  constructor(private http: HttpClient, private db: AngularFirestore) { }

  /*---- NPM RUN API for Mock data ---- */

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(EventService.ROOT_ENDPOINT + 'events.json', event);
  }

  // getEvents(): Observable<Event[]> {
  //   return this.http.get<Event[]>(EventService.ROOT_ENDPOINT + 'events.json');
  // }

  getEvents(): Observable<Event[]> {
    return this.db.collection('events').snapshotChanges().pipe(map(docArray => {
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

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(EventService.ROOT_ENDPOINT + 'events/' + id + '.json');
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(EventService.ROOT_ENDPOINT + 'events/' + event.id + '.json', event);
  }

  deleteEvent(id: string): Observable<Event> {
    return this.http.delete<Event>(EventService.ROOT_ENDPOINT + 'events/' + id + '.json');
  }
}
