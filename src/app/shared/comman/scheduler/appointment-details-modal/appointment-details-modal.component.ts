import { Component } from '@angular/core';
import { UpcomingAppModalComponent } from '../upcoming-app-modal/upcoming-app-modal.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CollectPaymentModalComponent } from '../collect-payment-modal/collect-payment-modal.component';
import { EditAppointmentModalComponent } from '../edit-appointment-modal/edit-appointment-modal.component';

@Component({
  selector: 'app-appointment-details-modal', 
  templateUrl: './appointment-details-modal.component.html',
  styleUrl: './appointment-details-modal.component.scss'
})
export class AppointmentDetailsModalComponent {
  constructor(private router: Router, public dialog: MatDialog) { }

  upcomingAppointmentModal(){
    const dialogRef = this.dialog.open(UpcomingAppModalComponent,{
      width:'310px',
      panelClass: [ 'modal--wrapper'],
    });
  }
  collectPaymentModal(){
    const dialogRef = this.dialog.open(CollectPaymentModalComponent,{
      width:'310px',
      panelClass: [ 'modal--wrapper'],
    });
  }
  editAppointment(){
    const dialogRef = this.dialog.open(EditAppointmentModalComponent,{
      width:'1260px',
      panelClass: [ 'modal--wrapper'],
    });
  }
}
