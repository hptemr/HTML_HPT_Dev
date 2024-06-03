import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'; 
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component'; 

@Component({
  selector: 'app-add-edit-contact', 
  templateUrl: './add-edit-contact.component.html',
  styleUrl: './add-edit-contact.component.scss'
})
export class AddEditContactComponent {
  model: NgbDateStruct;
  constructor(  public dialog: MatDialog) {}
  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote: 'Contact Added Successfully'
      }
    });
  }

}
