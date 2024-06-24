import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';

@Component({
  selector: 'app-case-note-modal', 
  templateUrl: './case-note-modal.component.html',
  styleUrl: './case-note-modal.component.scss'
})
export class CaseNoteModalComponent {
  constructor(public dialog: MatDialog) {} 
  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote: 'Case note has been created successfully!'
      }
    });
  }
}
