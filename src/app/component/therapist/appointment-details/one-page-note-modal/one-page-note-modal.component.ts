import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EFaxModalComponent } from '../e-fax-modal/e-fax-modal.component';

@Component({
  selector: 'app-one-page-note-modal', 
  templateUrl: './one-page-note-modal.component.html',
  styleUrl: './one-page-note-modal.component.scss'
})
export class OnePageNoteModalComponent {
  constructor(public dialog: MatDialog) {}
  efaxModal() {
    const dialogRef = this.dialog.open(EFaxModalComponent,{
      width:"960px",
    });
  }
}
