import {Component, OnInit} from '@angular/core';
import { slideIn } from '../../animations';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Event} from '../../models/Event';
import {EventService} from '../../services/event.service';
import {Router} from '@angular/router';
// @ts-ignore
import moment from 'moment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  animations: [slideIn]
})
export class AddEventComponent implements OnInit {
  form: FormGroup;
  event: Event;

  constructor(private eventService: EventService,
              public router: Router,
              private snackBar: MatSnackBar,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: Validators.required}),
      date: new FormControl(null, {validators: Validators.required}),
      desc: new FormControl(null, {validators: Validators.required}),
    });
  }

  openSnackBar(): void {
    this.snackBar.open(this.translate.instant('dialog.add-event'), 'Close', {duration: 1500});
  }

  onAddEvent(): void {
    if (!this.form.value) {
      return;
    }

    this.event = new Event();
    this.event = {
      name: this.form.value.name,
      date: moment(this.form.value.date).format('L'),
      description: this.form.value.desc
    };

    this.eventService.createEvent(this.event);
    this.openSnackBar();
    this.router.navigate(['/events']);
  }
}
