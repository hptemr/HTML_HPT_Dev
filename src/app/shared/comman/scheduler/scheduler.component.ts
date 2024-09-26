import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateAppointmentModalComponent } from './create-appointment-modal/create-appointment-modal.component';

@Component({
  selector: 'app-scheduler', 
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss'
})
export class SchedulerComponent {
  constructor(private router: Router, public dialog: MatDialog) { }
  selected: Date | null;
  createAppointmen(){
    const dialogRef = this.dialog.open(CreateAppointmentModalComponent,{
      width:'1260px',
      panelClass: [ 'modal--wrapper'],
    });
  }
}
