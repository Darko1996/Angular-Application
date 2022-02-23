import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';
import {Event} from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class OldRestApiEventService {
  private static readonly ROOT_ENDPOINT = 'https://crud-app-f7ae8-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(OldRestApiEventService.ROOT_ENDPOINT + 'products.json');
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(OldRestApiEventService.ROOT_ENDPOINT + 'products.json', event);
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(OldRestApiEventService.ROOT_ENDPOINT + 'products/' + id + '.json');
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(OldRestApiEventService.ROOT_ENDPOINT + 'products/' + event.id + '.json', event);
  }

  deleteEvent(id: string): Observable<Event> {
    return this.http.delete<Event>(OldRestApiEventService.ROOT_ENDPOINT + 'products/' + id + '.json');
  }
}
