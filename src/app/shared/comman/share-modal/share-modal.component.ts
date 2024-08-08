 


import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './share-modal.component.html',
  styleUrl: './share-modal.component.scss'
})
export class ShareModalComponent {
  successNote = '';
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ShareModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.successNote = data.successNote != undefined ? data.successNote : this.successNote;
 
  }

  share(){
    this.dialogRef.close(true)
  }

  close(){
    this.dialogRef.close(false)
  }
}
