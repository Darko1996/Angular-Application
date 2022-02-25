import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {LoaderType} from '../models/LoaderType';

@Injectable({
  providedIn: 'root'
})
export class SharedLoaderService {
  static readonly FULL = 'full';
  static readonly BAR = 'bar';

  private _showLoader = new Subject<LoaderType>();
  showLoaderEvent$ = this._showLoader.asObservable();

  private _dismissLoader = new Subject();
  dismissLoaderEvent$ = this._dismissLoader.asObservable();

  constructor() {}

  showFullLoader(message?: string): void {
    this._showLoader.next(new LoaderType(SharedLoaderService.FULL, message));
  }

  showBarLoader(): void {
    this._showLoader.next(new LoaderType(SharedLoaderService.BAR));
  }

  dismissLoader(): void {
    this._dismissLoader.next();
  }
}
