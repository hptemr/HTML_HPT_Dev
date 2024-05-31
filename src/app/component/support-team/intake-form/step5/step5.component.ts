import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { AppointmentReqModalComponent } from 'src/app/component/patient/book-appointment/appointment-req-modal/appointment-req-modal.component';

@Component({
  selector: 'app-step5', 
  templateUrl: './step5.component.html',
  styleUrl: './step5.component.scss'
})
export class Step5Component {
  toggle:boolean = true;
  selectedValue: number;

  constructor(public dialog: MatDialog) { }
  
  change(){
    this.toggle = !this.toggle;
  }

  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }

  appReqModal() {
    const dialogRef = this.dialog.open(AppointmentReqModalComponent,{
      panelClass: 'custom-alert-container', 
    });
  }

}
