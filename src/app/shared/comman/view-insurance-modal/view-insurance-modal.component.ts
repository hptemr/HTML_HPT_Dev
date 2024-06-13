import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CmsModalComponent } from '../cms-modal/cms-modal.component';
import { SharedModule } from '../../shared.module';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-insurance-modal', 
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './view-insurance-modal.component.html',
  styleUrl: './view-insurance-modal.component.scss'
})
export class ViewInsuranceModalComponent {
  model: NgbDateStruct;
  constructor(public dialog: MatDialog) { }
  cmsModal(){
    const dialogRef = this.dialog.open(CmsModalComponent,{
      panelClass: 'cms--container', 
    });
  }
}
