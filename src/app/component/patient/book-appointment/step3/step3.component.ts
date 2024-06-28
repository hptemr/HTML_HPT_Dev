import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BodyDetailsModalComponent } from './body-details-modal/body-details-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-step3', 
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component {
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
 

  addAnotherAllergy() {
    // this.allergies.push({new allergies()})
  }

  bodyposition = 'head';
  
  constructor(public dialog: MatDialog) { }

  bodyClick() {
    const dialogRef = this.dialog.open(BodyDetailsModalComponent,{
      panelClass: 'custom-alert-container', 
    });  
  }
  
}
