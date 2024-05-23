import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RescheduleAppointmentModalComponent } from 'src/app/shared/comman/reschedule-appointment-modal/reschedule-appointment-modal.component';
import { WriteCommentModalComponent } from 'src/app/shared/comman/write-comment-modal/write-comment-modal.component';

@Component({
  selector: 'app-appointment-details', 
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss'
})
export class AppointmentDetailsComponent {
  constructor(private router: Router, public dialog: MatDialog) { }
  rescheduleModal(){
    const dialogRef = this.dialog.open(RescheduleAppointmentModalComponent,{
      panelClass: 'custom-alert-container',
    });
  }
  writeComment(){
    const dialogRef = this.dialog.open(WriteCommentModalComponent,{
      panelClass: 'custom-alert-container',
    });
  }
}
