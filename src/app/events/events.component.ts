import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {slideIn} from '../animations';
import {EventService} from '../services/event.service';
import {finalize, map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';
import {Event} from '../models/Event';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../shared/dialog/dialog.component';
import {Dialog, DialogMode} from '../models/Dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

// import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  animations: [slideIn]
})
export class EventsComponent implements OnInit, OnDestroy {
  events: Event[] = [];
  event: Event;
  isLoading = false;
  private onDestroy = new Subject();
  displayedColumns: string[] = ['position', 'name', 'date', 'description', 'edit', 'delete'];
  dataSource: any;

  constructor(public http: HttpClient,
              public eventService: EventService,
              public router: Router,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.executeLoad();
  }

  openSnackBar() {
    this.snackBar.open('You successfully Deleted the Event', 'Close', {duration: 1500});
  }

  executeLoad() {
    this.eventService.getEvents().pipe(takeUntil(this.onDestroy), finalize( () => this.isLoading = true), map(responseData => {
      const eventsArray = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          eventsArray.push({...responseData[key], id: key});
        }
      }
      return eventsArray;
    })).subscribe(data => {
      this.events = data;
      this.dataSource = new MatTableDataSource(this.events);
      console.log('events', this.events);
    }, err => {
      console.log('error', err);
    });
  }

  withoutTime(nowDate) {
    return (nowDate.getMonth() + 1 ) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
  }

  editEvent(event: Event) {
    this.router.navigate(['/edit-event', event.id], {queryParams: {id: event.id} });
  }

  viewModal(event: Event, template) {
    this.event = event;
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
  }

  confirm(): void {
    this.eventService.deleteEvent(this.event.id).pipe(takeUntil(this.onDestroy), finalize(() => this.openSnackBar())).subscribe(data => {
      this.executeLoad();
    }, err => {
      console.log(err);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  applyFilter(event) {
    const filterValue = (event.target).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(elem) {
    this.event = elem;
    const dialog = new Dialog();
    dialog.data = elem;
    dialog.width = DialogMode.SMALL;
    dialog.title = 'Confirmation Delete';
    dialog.content = 'Are you sure you want to delete this Event?';

    console.log('dialog', dialog );
    if (dialog) {
      const dialogRef = this.dialog.open(DialogComponent, {data: dialog, width: dialog.width});
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.confirm();
        }
      });
    }

  }

}
