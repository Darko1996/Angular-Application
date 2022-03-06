import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class OldRestApiEventService {
  private static readonly ROOT_ENDPOINT = 'https://crud-app-f7ae8-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Product[]> {
    return this.http.get<Product[]>(OldRestApiEventService.ROOT_ENDPOINT + 'products.json');
  }

  createEvent(event: Product): Observable<Product> {
    return this.http.post<Product>(OldRestApiEventService.ROOT_ENDPOINT + 'products.json', event);
  }

  getEventById(id: string): Observable<Product> {
    return this.http.get<Product>(OldRestApiEventService.ROOT_ENDPOINT + 'products/' + id + '.json');
  }

  updateEvent(event: Product): Observable<Product> {
    return this.http.put<Product>(OldRestApiEventService.ROOT_ENDPOINT + 'products/' + event.id + '.json', event);
  }

  deleteEvent(id: string): Observable<Product> {
    return this.http.delete<Product>(OldRestApiEventService.ROOT_ENDPOINT + 'products/' + id + '.json');
  }
}
