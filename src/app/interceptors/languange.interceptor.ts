import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocalStorageService} from '../services/angular-universal.service';

@Injectable()
export class LanguangeInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const lang = this.localStorageService.getItem('lang') || 'en';
    request = request.clone({
      setHeaders: {
        'Accept-language': lang
      }
    });
    return next.handle(request);
  }
}
