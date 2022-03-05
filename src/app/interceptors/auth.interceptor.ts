import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpParams
} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {exhaustMap, map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../ngrx/app.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.State>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    return this.store.select(fromApp.getAuthState).pipe(take(1),
      map( authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        console.log('->', user);
        if (!user) {
          return next.handle(request);
        }
        const modifedReq = request.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifedReq);
      })
    );

    // return  this.authService.authUser.pipe(take(1), exhaustMap(user => {
    //   if (!user) {
    //     return next.handle(request);
    //   }
    //   const modifedReq = request.clone({
    //     params: new HttpParams().set('auth', user.token)
    //   });
    //   return next.handle(modifedReq);
    // })
    // );
  }
}
