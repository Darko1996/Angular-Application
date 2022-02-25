import {Component, OnInit} from '@angular/core';
import { AuthService } from './../services/auth.service';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import * as fromRoot from '../ngrx/app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated$: Observable<boolean>;
  // userIsAuthenticated = false;
  // private onDestroy = new Subject();

  constructor(
    public authService: AuthService,
    private store: Store<fromRoot.State>,
    private titlePage: Title,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.userIsAuthenticated$ = this.store.select(fromRoot.getIsAuth);

    // this.authService.authUser.pipe(takeUntil(this.onDestroy)).subscribe(data => {
    //   this.userIsAuthenticated = !!data;
    // });
  }

  setPageTitle(title: string): void {
    this.titlePage.setTitle('Angular App | ' + this.translate.instant('navigation.' + title));
  }

  signOut(): void {
    this.authService.logout();
  }

  // ngOnDestroy(): void {
  //   this.onDestroy.next();
  //   this.onDestroy.complete();
  // }
}
