import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  cancel_btn:string = 'Cancel'
  warningNote = '';
  disabled_yes:boolean=false
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AlertComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.warningNote = data.warningNote != undefined ? data.warningNote : this.warningNote;    
   
    this.disabled_yes = data.submitdisabled != undefined ? data.submitdisabled : this.disabled_yes;   
    if(this.disabled_yes){this.cancel_btn='Ok';}
    
    
  }
}
