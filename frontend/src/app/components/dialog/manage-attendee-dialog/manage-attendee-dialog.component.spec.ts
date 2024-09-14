import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAttendeeDialogComponent } from './manage-attendee-dialog.component';

describe('ManageAttendeeDialogComponent', () => {
  let component: ManageAttendeeDialogComponent;
  let fixture: ComponentFixture<ManageAttendeeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAttendeeDialogComponent]
    });
    fixture = TestBed.createComponent(ManageAttendeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
