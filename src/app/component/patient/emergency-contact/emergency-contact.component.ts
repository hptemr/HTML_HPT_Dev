import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';

@Component({
  selector: 'app-emergency-contact', 
  templateUrl: './emergency-contact.component.html',
  styleUrl: './emergency-contact.component.scss'
})
export class EmergencyContactComponent {
  model: NgbDateStruct;

  constructor(  public dialog: MatDialog) {}
  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote: 'Contact Details have been saved successfully!'
      }
    });
  }
}
