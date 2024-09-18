import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SelectPrimaryInsuModalComponent } from 'src/app/shared/comman/select-primary-insu-modal/select-primary-insu-modal.component';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrl: './billing-details.component.scss'
})
export class BillingDetailsComponent {
  
  model: NgbDateStruct;
  constructor(public dialog: MatDialog, ) {}

  selectInsuranceModal() {
    const dialogRef = this.dialog.open(SelectPrimaryInsuModalComponent,{
      width:'650px',
      panelClass: [ 'modal--wrapper'],
    });
  }
}
