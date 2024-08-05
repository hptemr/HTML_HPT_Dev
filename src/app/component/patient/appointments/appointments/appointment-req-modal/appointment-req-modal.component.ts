import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reschedule-appointment-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './appointment-req-modal.component.html',
  styleUrl: './appointment-req-modal.component.scss'
})
export class AppointmentReqModalComponent {
  model: NgbDateStruct;

  constructor(public dialog: MatDialog) {
  }
 

  
  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successHeader:'Appointment Requested',
        successNote: ' Thank you for requesting an appointment. Your recovery is our only priority. We are working diligently on your request and  will respond in 1 business day or less. '
      }
    });
  }
  
}
