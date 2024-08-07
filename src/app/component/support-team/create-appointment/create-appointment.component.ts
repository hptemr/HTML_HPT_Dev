import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';


@Component({
  selector: 'app-create-appointment', 
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss'
})
export class CreateAppointmentComponent {
  model: NgbDateStruct;
  selectedValue: number;
  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }

  constructor(  public dialog: MatDialog) {}
  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote: 'The Appointment has been created successfully!'
      }
    });
  }
}
