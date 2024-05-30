import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CmsModalComponent } from 'src/app/shared/comman/cms-modal/cms-modal.component';
import { AddInsuranceModalComponent } from '../add-insurance-modal/add-insurance-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-step2', 
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {
  model: NgbDateStruct;

  constructor(public dialog: MatDialog) { }
  cmsModal(){
    const dialogRef = this.dialog.open(CmsModalComponent,{
      panelClass: 'cms--container', 
    });
  }
  addInsurance(){
    const dialogRef = this.dialog.open(AddInsuranceModalComponent,{
      panelClass: 'custom-alert-container', 
    });
  }
}
