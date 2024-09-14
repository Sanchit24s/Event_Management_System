import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from 'src/app/services/event.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Event } from 'src/app/models/event.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateEventDialogComponent } from '../../dialog/create-event-dialog/create-event-dialog.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'date', 'attendees', 'actions'];
  dataSource = new MatTableDataSource<Event>([]);

  totalEvents = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private eventService: EventService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents(event?: PageEvent) {
    const page = event ? event.pageIndex : 0;
    const pageSize = event ? event.pageSize : this.pageSize;

    this.eventService.getEvents(page, pageSize).subscribe({
      next: (response) => {
        this.dataSource.data = response.events;
        this.totalEvents = response.totalCount;
      },
      error: (error) => {
        console.error('Error fetching events', error);
        this.notificationService.showError('Failed to load events. Please try again later.');
      }
    });
  }

  deleteEvent(id: string) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.notificationService.showSuccess("Event Deleted Successfully");
        this.loadEvents();
      }, (error) => {
        console.error('Delete failed', error);
        this.notificationService.showError('Delete event failed.');
      });
    }
  }

  openCreateEventDialog(): void {
    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      width: '400px',
      height: 'auto',
      position: {
        top: '0px',
        left: '100px'
      },
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadEvents();
    });
  }
}
