import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  // Remove all console logs
  // if (window) {
  //   window.console.log = () => {};
  // }
}
document.addEventListener('DOMContentLoaded', () => {
 platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
});
