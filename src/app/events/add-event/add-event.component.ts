import {Component, OnDestroy, OnInit} from '@angular/core';
import { slideIn } from '../../animations';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Event} from '../../models/Event';
import {EventService} from '../../services/event.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';
import {Router} from '@angular/router';
// @ts-ignore
import moment from 'moment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  animations: [slideIn]
})
export class AddEventComponent implements OnInit, OnDestroy {
  form: FormGroup;
  event: Event;
  private onDestroy = new Subject();

  constructor(private eventService: EventService,
              public router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: Validators.required}),
      date: new FormControl(null, {validators: Validators.required}),
      desc: new FormControl(null, {validators: Validators.required}),
    });
  }

  openSnackBar() {
    this.snackBar.open('You successfully added the Event', 'Close', {duration: 1500});
  }

  onAddEvent() {
    this.event = new Event();
    this.event = {
      name: this.form.value.name,
      date: moment(this.form.value.date).format('L'),
      description: this.form.value.desc
    };

    if (!this.form.value) {
      return;
    }

    this.eventService.createEvent(this.event).pipe(takeUntil(this.onDestroy), finalize(() => this.openSnackBar())).subscribe(data => {
      console.log('data', data);
      this.router.navigate(['/events']);
    }, err => {
      console.log('error', err);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
