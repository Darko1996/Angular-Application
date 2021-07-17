import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './services/auth.service';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.authUser.pipe(map(user => {
      return !!user;
    }), tap(isAuth => {
      if (!isAuth) {
        alert('You have to login to see this page.');
        this.router.navigate(['/login']);
      }
    })
    );
  }
}
