import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-cms-modal', 
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, CommonModule , FormsModule, ReactiveFormsModule],
  templateUrl: './cms-modal.component.html',
  styleUrl: './cms-modal.component.scss'
})
export class CmsModalComponent {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CmsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
 
    
  }

  aggree(from:string){
    if(from=='I agree'){
      this.dialogRef.close(true);
    }else{
      this.dialogRef.close(false);
    }
    
  }
}
