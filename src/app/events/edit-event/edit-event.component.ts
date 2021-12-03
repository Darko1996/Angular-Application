import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Event} from '../../models/Event';
import {slideIn} from '../../animations';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';
import {EventService} from '../../services/event.service';
// @ts-ignore
import moment from 'moment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {isEqual, cloneDeep} from 'lodash';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
  animations: [slideIn]
})
export class EditEventComponent implements OnInit, OnDestroy {
  form: FormGroup;
  event: Event;
  eventCopy = new Event();
  onDestroy = new Subject();
  eventId: string;

  constructor(public activatedRoute: ActivatedRoute,
              public eventService: EventService,
              public router: Router,
              private snackBar: MatSnackBar,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.queryParams.pipe(takeUntil(this.onDestroy)).subscribe(params => {
      this.eventService.getEventById(params.id).then((event: Event) => {
        this.event = event;
        this.eventId = params.id;
        this.updateForm(event);
      });
    });
  }

  checkIfDataChange(): boolean {
    this.form.value.date = moment(this.form.value?.date).format('L');
    return this.equals(this.form.value, this.eventCopy);
  }

  protected equals(a: any, b: any): boolean {
    return isEqual(a, b);
  }

  openSnackBar(): void  {
    this.snackBar.open(this.translate.instant('dialog.save-event'), 'Close', {duration: 1500});
  }

  ngOnDestroy(): void  {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: Validators.required}),
      date: new FormControl(null, {validators: Validators.required}),
      description: new FormControl(null, {validators: Validators.required}),
    });
  }

  updateForm(event: Event): void {
    this.form.patchValue({
      name: event?.name,
      date: new Date(event?.date),
      description: event?.description,
      id: event?.id
    });

    // Format cloned event date for validation button
    const clonedEvent = this.form.value;
    clonedEvent.date = moment(this.form.value?.date).format('L');
    this.eventCopy = cloneDeep(clonedEvent);
  }

  updateEvent(): void  {
    this.event = new Event();
    this.event = {
      name: this.form.value?.name,
      date: moment(this.form.value?.date).format('L'),
      description: this.form.value?.description,
      id: this.eventId
    };

    this.eventService.updateEvent(this.event);

    this.openSnackBar();
    this.router.navigate(['/events']);
  }
}
