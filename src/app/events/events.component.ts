import {HttpClient} from '@angular/common/http';
import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {slideIn} from '../animations';
import {EventService} from '../services/event.service';
import {finalize, map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';
import {Event} from '../models/Event';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {SharedDialogComponent} from '../shared/shared-dialog/shared-dialog.component';
import {Dialog, DialogMode} from '../models/Dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs/internal/Observable';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  animations: [slideIn]
})
export class EventsComponent implements OnInit, OnDestroy {
  event: Event;
  isLoading = false;
  private onDestroy = new Subject();
  displayedColumns: Array<string> = ['position', 'name', 'date', 'description', 'edit', 'delete'];
  dataSource: Event[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(public http: HttpClient,
              public eventService: EventService,
              public router: Router,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.executeLoad();
  }

  openSnackBar(): void {
    this.snackBar.open('You successfully Deleted the Event', 'Close', {duration: 1500});
  }

  executeLoad(): void {
    this.eventService.getEvents().pipe(takeUntil(this.onDestroy), finalize( () => this.isLoading = true)).subscribe(data => {
      this.dataSource = data;
      // this.dataSource.sort = this.sort;
      console.log('dataSource', this.dataSource);

    }, err => {
      console.log('error', err);
    });
  }

  editEvent(event: Event): void {
    this.router.navigate(['/edit-event', event.id], {queryParams: {id: event.id} });
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

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    // this.dataSource.filter = filterValue;
  }

  openDialog(elem): void {
    this.event = elem;
    const dialog = new Dialog();
    dialog.data = elem;
    dialog.width = DialogMode.SMALL;
    dialog.title = 'Confirmation Delete';
    dialog.content = 'Are you sure you want to delete this Event?';

    console.log('dialog', dialog );
    if (dialog) {
      const dialogRef = this.dialog.open(SharedDialogComponent, {data: dialog, width: dialog.width});
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.confirm();
        }
      });
    }

  }

}
