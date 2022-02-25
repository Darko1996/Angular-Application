import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import {map, take, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromRoot from './ngrx/app.reducer';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    // private authService: AuthService,
    private router: Router,
    private store: Store<fromRoot.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.store.select(fromRoot.getIsAuth).pipe(take(1));
    if (isAuth) {
      return isAuth;
    } else {
      this.router.navigate(['/login']);
    }

    // return this.authService.authUser.pipe(map(user => {
    //   return !!user;
    // }), tap(isAuth => {
    //   if (!isAuth) {
    //     this.router.navigate(['/login']);
    //   }
    // })
    // );
  }
}
