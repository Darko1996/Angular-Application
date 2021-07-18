import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-shared-language-menu',
  templateUrl: './shared-language-menu.component.html',
  styleUrls: ['./shared-language-menu.component.scss']
})
export class SharedLanguageMenuComponent implements OnInit {

  @Input() orientation?: 'horizontal' | 'vertical';

  currentLanguage: any;
  languages: any[];
  showAvailable = false;

  constructor() {
    this.languages = [{
      locale: 'en',
      src: '../../../assets/images/languages-menu/en.png'
    },
    {
      locale: 'rs',
      src: '../../../assets/images/languages-menu/rs.png'
    }];
  }

  ngOnInit() {
    // this.currentLanguage = this.getCurrentLanguageData(this.translateService.currentLang);
  }

  toggleAvailable() {
    this.showAvailable = !this.showAvailable;
  }

  getCurrentLanguageData(currentLanguage: string): any {
    return this.languages.find(l => l.locale === (currentLanguage || 'en'));
  }

  select(language: string) {
    this.currentLanguage = this.getCurrentLanguageData(language);
    this.toggleAvailable();
    // this.translateService.use(language);
    // TODO: Do real translate
  }

}
