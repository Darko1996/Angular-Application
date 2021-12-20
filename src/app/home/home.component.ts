import {Component, OnDestroy, OnInit} from '@angular/core';
import { slideIn } from '../animations';
import {takeUntil} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {Subject} from 'rxjs/internal/Subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideIn]
})
export class HomeComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject();
  userIsAuthenticated = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authUser.pipe(takeUntil(this.onDestroy)).subscribe(data => {
      this.userIsAuthenticated = !!data;
      // console.log('userIsAuthenticated', this.userIsAuthenticated);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
