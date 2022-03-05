import { Injectable } from '@angular/core';
import * as fromApp from '../ngrx/app.reducer';
import * as Loader from '../ngrx/actions/loader.actions';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class SharedLoaderService {
  static readonly FULL = 'full';
  static readonly BAR = 'bar';

  // private _showLoader = new Subject<LoaderType>();
  // showLoaderEvent$ = this._showLoader.asObservable();
  //
  // private _dismissLoader = new Subject();
  // dismissLoaderEvent$ = this._dismissLoader.asObservable();

  constructor(private store: Store<fromApp.State>) {}

  showFullLoader(message?: string): void {
    this.store.dispatch(new Loader.StartLoader({
      type: SharedLoaderService.FULL,
      message: message
    }));
    // this._showLoader.next(new LoaderType(SharedLoaderService.FULL, message));
  }

  showBarLoader(): void {
    this.store.dispatch(new Loader.StartLoader({
      type: SharedLoaderService.BAR
    }));
    // this._showLoader.next(new LoaderType(SharedLoaderService.BAR));
  }

  dismissLoader(): void {
    this.store.dispatch(new Loader.StopLoader());
    // this._dismissLoader.next();
  }
}
