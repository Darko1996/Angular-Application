import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedLanguageMenuComponent } from './shared-language-menu.component';

describe('SharedLanguageMenuComponent', () => {
  let component: SharedLanguageMenuComponent;
  let fixture: ComponentFixture<SharedLanguageMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedLanguageMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedLanguageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
