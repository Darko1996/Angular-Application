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

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
  animations: [slideIn]
})
export class EditEventComponent implements OnInit, OnDestroy {
  form: FormGroup;
  event: Event;
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
      this.eventService.getEventById(params.id).pipe(takeUntil(this.onDestroy)).subscribe(data => {
        this.event = data;
        this.eventId = params.id;
        this.updateForm();
      }, err => {
        console.log(err);
      });
    });
  }

  openSnackBar() {
    this.snackBar.open(this.translate.instant('dialog.save-event'), 'Close', {duration: 1500});
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: Validators.required}),
      date: new FormControl(null, {validators: Validators.required}),
      desc: new FormControl(null, {validators: Validators.required}),
    });
  }

  updateForm() {
    this.form.patchValue({
      name: this.event.name,
      date: new Date(this.event.date),
      desc: this.event.description,
      id: this.event.id
    });
  }

  updateEvent() {
    this.event = new Event();
    this.event = {
      name: this.form.value.name,
      date: moment(this.form.value.date).format('L'),
      description: this.form.value.desc,
      id: this.eventId
    };

    this.eventService.updateEvent(this.event).pipe(takeUntil(this.onDestroy), finalize(() => this.openSnackBar())).subscribe(data => {
      this.router.navigate(['/events']);
    }, err => {
      console.log(err);
    });
  }

}
