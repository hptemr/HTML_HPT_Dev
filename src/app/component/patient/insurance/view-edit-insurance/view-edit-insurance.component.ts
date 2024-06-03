import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AddInsuranceModalComponent } from '../../book-appointment/add-insurance-modal/add-insurance-modal.component';

@Component({
  selector: 'app-view-edit-insurance', 
  templateUrl: './view-edit-insurance.component.html',
  styleUrl: './view-edit-insurance.component.scss'
})
export class ViewEditInsuranceComponent {
  model: NgbDateStruct;
  constructor(  public dialog: MatDialog) {}
  addInsurance(){
    const dialogRef = this.dialog.open(AddInsuranceModalComponent,{
      panelClass: 'custom-alert-container', 
    });
  }
}
