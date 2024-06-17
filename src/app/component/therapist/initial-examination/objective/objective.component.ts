import { Component } from '@angular/core';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-objective', 
  templateUrl: './objective.component.html',
  styleUrl: './objective.component.scss'
})
export class ObjectiveComponent {
  constructor(public dialog: MatDialog) {}
 
  addExersiceModal() {
    const dialogRef = this.dialog.open(AddExerciseComponent, {
      panelClass:[ 'custom-alert-container','modal--wrapper'],
    });
  }
}
