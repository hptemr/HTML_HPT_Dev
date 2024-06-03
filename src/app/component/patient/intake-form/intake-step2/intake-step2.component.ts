import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CmsModalComponent } from 'src/app/shared/comman/cms-modal/cms-modal.component';
import { AddInsuranceModalComponent } from '../../book-appointment/add-insurance-modal/add-insurance-modal.component';

@Component({
  selector: 'app-intake-step2', 
  templateUrl: './intake-step2.component.html',
  styleUrl: './intake-step2.component.scss'
})
export class IntakeStep2Component {
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
