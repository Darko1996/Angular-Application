import {Component, OnDestroy, Renderer2} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {SharedLoaderService} from '../../services/shared-loader.service';
import {TranslateService} from '@ngx-translate/core';
import {takeUntil} from 'rxjs/operators';
import {LoaderType} from '../../models/LoaderType';

@Component({
  selector: 'app-shared-loader',
  templateUrl: './shared-loader.component.html',
  styleUrls: ['./shared-loader.component.scss']
})
export class SharedLoaderComponent implements OnDestroy {

  private onDestroy = new Subject();
  private clickEvent;
  private clickHandler: any = this.preventClick.bind(this);

  showFull = false;
  showBar = false;
  mainText: string;

  constructor(private loaderService: SharedLoaderService,
              private renderer: Renderer2,
              private translate: TranslateService) {

    this.loaderService.showLoaderEvent$.pipe(takeUntil(this.onDestroy)).subscribe((value: LoaderType) => {
      this.showFull = value.type === SharedLoaderService.FULL;
      this.showBar = value.type === SharedLoaderService.BAR;
      this.mainText = this.translate.instant(value.message ? value.message : 'loader.subtext');

      // Prevent all click when bar loader is shown. Enable click again after 10sec.
      if (this.showBar) {
        document.addEventListener('click', this.clickHandler,  true);
        setTimeout(() => {
          this.enableClick();
        }, 10000);
      }
    });

    this.loaderService.dismissLoaderEvent$.pipe(takeUntil(this.onDestroy)).subscribe(_ => {
      this.enableClick();
      this.showFull = false;
      this.showBar = false;
      this.mainText = undefined;
    });
  }

  preventClick(e: MouseEvent): void {
    e.stopPropagation();
    e.preventDefault();
  }

  enableClick(): void {
    document.removeEventListener('click', this.clickHandler, true);
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
