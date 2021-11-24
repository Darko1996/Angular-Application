import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SharedDialogComponent } from './shared-dialog.component';

describe('DialogComponent', () => {
  let component: SharedDialogComponent;
  let fixture: ComponentFixture<SharedDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
