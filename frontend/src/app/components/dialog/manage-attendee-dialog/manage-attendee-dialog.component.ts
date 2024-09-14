import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-manage-attendee-dialog',
  templateUrl: './manage-attendee-dialog.component.html',
  styleUrls: ['./manage-attendee-dialog.component.css']
})
export class ManageAttendeeDialogComponent implements OnInit {
  attendees: any[] = [];
  addAttendeeForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ManageAttendeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventService: EventService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.addAttendeeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadAttendees();
  }

  loadAttendees() {
    this.eventService.getAttendees(this.data.eventId).subscribe(
      (attendees: any[]) => {
        this.attendees = attendees;
      },
      (error) => {
        console.error('Error loading attendees', error);
      }
    );
  }

  addAttendee() {
    if (this.addAttendeeForm.valid) {
      this.eventService.addAttendee(this.data.eventId, this.addAttendeeForm.value.email).subscribe(
        (response) => {
          this.notificationService.showSuccess('Attendee added successfully!');
          this.loadAttendees(); // Refresh attendees list after adding
          this.addAttendeeForm.reset();
        },
        (error) => {
          if (error.error === 'User not found') {
            this.notificationService.showError('User not found. Please check the email.');
          } else if (error.error === 'User is already an attendee') {
            this.notificationService.showError('This user is already an attendee.');
          } else {
            console.error('Failed to add attendee:', error);
            this.notificationService.showError('Failed to add attendee.');
          }
        }
      );
    }
  }

  removeAttendee(attendeeId: string) {
    this.eventService.removeAttendee(this.data.eventId, attendeeId).subscribe(
      (response) => {
        this.notificationService.showSuccess('Attendee removed successfully!');
        this.loadAttendees(); // Refresh attendees list after removal
      },
      (error) => {
        console.error('Failed to remove attendee', error);
        this.notificationService.showError('Failed to remove attendee.');
      }
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
