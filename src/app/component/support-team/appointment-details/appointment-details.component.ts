import { Component } from '@angular/core';
import { SystemFollowupModalComponent } from '../system-followup-modal/system-followup-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { WriteCommentModalComponent } from 'src/app/shared/comman/write-comment-modal/write-comment-modal.component';
import { RescheduleAppointmentModalComponent } from 'src/app/shared/comman/reschedule-appointment-modal/reschedule-appointment-modal.component';

@Component({
  selector: 'app-appointment-details', 
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss'
})
export class AppointmentDetailsComponent {
  constructor(public dialog: MatDialog) {}

  systemFollowup() {
    const dialogRef = this.dialog.open(SystemFollowupModalComponent,{
      panelClass: 'custom-alert-container', 
    });
  }

  writeComment(){
    const dialogRef = this.dialog.open(WriteCommentModalComponent,{
      panelClass: 'custom-alert-container',
    });
  }
 
  rescheduleModal(){
    const dialogRef = this.dialog.open(RescheduleAppointmentModalComponent,{
      panelClass: 'custom-alert-container',
    });
  }
}
