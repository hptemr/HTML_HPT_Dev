import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BodyDetailsModalComponent } from 'src/app/component/patient/book-appointment/step3/body-details-modal/body-details-modal.component';

@Component({
  selector: 'app-subjective', 
  templateUrl: './subjective.component.html',
  styleUrl: './subjective.component.scss'
})
export class SubjectiveComponent {
  isDisabled = true;
  clickedIndex = 0;
  model: NgbDateStruct;
  selectedValue: number;
  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }
  tabs = [
    {number: '1'}, {number: '2'}, {number: '3'},
    {number: '4'}, {number: '5'}, {number: '6'},
    {number: '7'}, {number: '8'}, {number: '9'},
    {number: '10'}
  ];


  constructor(public dialog: MatDialog) { }

  bodyClick() {
    const dialogRef = this.dialog.open(BodyDetailsModalComponent,{
      panelClass: 'custom-alert-container', 
    });  
  }
}
