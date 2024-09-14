import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.css']
})
export class CreateEventDialogComponent {
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateEventDialogComponent>
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      date: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.eventForm.value).subscribe(
        () => {
          this.notificationService.showSuccess('Event created successfully!');
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error creating event', error);
          this.notificationService.showError('Failed to create event.');
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
