import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentReqModalComponent } from 'src/app/component/patient/book-appointment/appointment-req-modal/appointment-req-modal.component';

@Component({
  selector: 'app-step4', 
  templateUrl: './step4.component.html',
  styleUrl: './step4.component.scss'
})
export class Step4Component {
  toggle:boolean = true;
  selectedValue: number;

  model: NgbDateStruct;

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
