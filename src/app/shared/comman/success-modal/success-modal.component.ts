 


import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.scss'
})
export class SuccessModalComponent {
  successNote = '';
  successHeader='';
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<SuccessModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.successNote = data.successNote != undefined ? data.successNote : this.successNote;
    this.successHeader = data.successHeader != undefined ? data.successHeader : this.successHeader;
 
  }
}
