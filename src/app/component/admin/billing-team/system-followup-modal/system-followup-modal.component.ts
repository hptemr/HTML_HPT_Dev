import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';

@Component({
  selector: 'app-system-followup-modal', 
  templateUrl: './system-followup-modal.component.html',
  styleUrl: './system-followup-modal.component.scss'
})
export class SystemFollowupModalComponent {
  constructor(public dialog: MatDialog) {}
  chooseTherapistAlert() {
    const dialogRef = this.dialog.open(AlertComponent,{
      panelClass: 'custom-alert-container',
      data : {
        warningNote: 'Kindly choose a therapist prior to confirming the appointment request.'
      }
    });
  }
}
