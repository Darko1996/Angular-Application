import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpParams
} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {exhaustMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return  this.authService.authUser.pipe(take(1), exhaustMap(user => {
      if (!user) {
        return next.handle(request);
      }
      const modifedReq = request.clone({
        params: new HttpParams().set('auth', user.token)
      });
      return next.handle(modifedReq);
    })
    );
  }
}
