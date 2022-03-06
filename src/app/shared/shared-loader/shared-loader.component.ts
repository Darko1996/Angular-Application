import {Component, Inject, OnDestroy, Renderer2} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {SharedLoaderService} from '../../services/shared-loader.service';
import {TranslateService} from '@ngx-translate/core';
import {takeUntil} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../../ngrx/app.reducer';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-shared-loader',
  templateUrl: './shared-loader.component.html',
  styleUrls: ['./shared-loader.component.scss']
})
export class SharedLoaderComponent implements OnDestroy {

  private onDestroy = new Subject();
  private clickHandler: any = this.preventClick.bind(this);

  showFull = false;
  showBar = false;
  mainText: string;

  constructor(private loaderService: SharedLoaderService,
              private renderer: Renderer2,
              private translate: TranslateService,
              private store: Store<fromApp.State>,
              @Inject(DOCUMENT) private document: Document) {

    // this.loaderService.showLoaderEvent$.pipe(takeUntil(this.onDestroy)).subscribe((value: LoaderType) => {
    this.store.select(fromApp.getLoaderState).pipe(takeUntil(this.onDestroy)).subscribe((value: any) => {
      this.showFull = value?.loader?.type === SharedLoaderService.FULL;
      this.showBar = value?.loader?.type === SharedLoaderService.BAR;
      this.mainText = this.translate.instant(value?.loader?.message ? value?.loader?.message : 'loader.subtext');

      // Prevent all click when bar loader is shown. Enable click again after 10sec.
      if (this.showBar) {
        document.addEventListener('click', this.clickHandler,  true);
        setTimeout(() => {
          this.enableClick();
        }, 10000);
      }
    });

    // this.loaderService.dismissLoaderEvent$.pipe(takeUntil(this.onDestroy)).subscribe(_ => {
    //   this.enableClick();
    //   this.showFull = false;
    //   this.showBar = false;
    //   this.mainText = undefined;
    // });
  }

  preventClick(e: MouseEvent): void {
    e.stopPropagation();
    e.preventDefault();
  }

  enableClick(): void {
    this.document.removeEventListener('click', this.clickHandler, true);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.enableClick();
  }

  closeLoader(): void {
    this.loaderService.dismissLoader();
  }
}
