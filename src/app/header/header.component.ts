import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from './../services/auth.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private onDestroy = new Subject();

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authUser.pipe(takeUntil(this.onDestroy)).subscribe(data => {
      this.userIsAuthenticated = !!data;
      console.log('userIsAuthenticated', this.userIsAuthenticated);
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  signOut() {
    this.authService.logout();
  }
}

