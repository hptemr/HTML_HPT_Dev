import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-body-details-modal', 
  templateUrl: './body-details-modal.component.html',
  styleUrl: './body-details-modal.component.scss'
})
export class BodyDetailsModalComponent {
  constructor(public dialog: MatDialog) { }
  saveData() {
    // this.dialogRef.close( );
  }
}
