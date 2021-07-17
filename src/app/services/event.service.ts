import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Event} from '../models/Event';
import {Subject} from 'rxjs/internal/Subject';
import {AuthUser} from '../models/Auth';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private static readonly ROOT_ENDPOINT = 'https://crud-app-f7ae8-default-rtdb.europe-west1.firebasedatabase.app/';
  authUser = new Subject<AuthUser>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  /*---- NPM RUN API for Mock data ---- */

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(EventService.ROOT_ENDPOINT + 'events.json', event);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(EventService.ROOT_ENDPOINT + 'events.json');
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
