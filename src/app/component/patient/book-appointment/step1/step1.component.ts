import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-step1', 
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})
export class Step1Component {
  model: NgbDateStruct;
  selectedValue: number;
  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }

  constructor(public dialog: MatDialog) { }

  contactModal(){
    const dialogRef = this.dialog.open(ContactModalComponent,{
      panelClass: 'custom-alert-container', 
    });
  }
}
