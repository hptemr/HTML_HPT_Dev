import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentReqModalComponent } from '../appointment-req-modal/appointment-req-modal.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrl: './step4.component.scss'
})
export class Step4Component {
  toggle: boolean = true;
  selectedValue: number;

  model: NgbDateStruct;
  step4FormData: any

  constructor(public dialog: MatDialog) { }
  
  ngOnInit() {

  }

  change() {
    this.toggle = !this.toggle;
  }

  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }

  appReqModal() {
    const dialogRef = this.dialog.open(AppointmentReqModalComponent, {
      panelClass: 'custom-alert-container',
    });
  }

}
