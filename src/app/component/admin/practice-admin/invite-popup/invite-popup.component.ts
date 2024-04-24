import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invite-popup', 
  templateUrl: './invite-popup.component.html',
  styleUrl: './invite-popup.component.scss'
})
export class InvitePopupComponent { 
  

  heading = '';
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<InvitePopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.heading = data.heading != undefined ? data.heading : this.heading;
 
  }
}
