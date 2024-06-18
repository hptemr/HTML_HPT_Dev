import { Component } from '@angular/core';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-objective', 
  templateUrl: './objective.component.html',
  styleUrl: './objective.component.scss'
})
export class ObjectiveComponent {
  clickedIndex = 0;
  selectedValue: number;
  tabs = [
    {number: '1'}, {number: '2'}, {number: '3'},
    {number: '4'}, {number: '5'}, {number: '6'},
    {number: '7'}, {number: '8'}, {number: '9'},
    {number: '10'}
  ];

  constructor(public dialog: MatDialog) {}
 
  addExersiceModal() {
    const dialogRef = this.dialog.open(AddExerciseComponent, {
      panelClass:[ 'custom-alert-container','modal--wrapper'],
    });
  }
}
