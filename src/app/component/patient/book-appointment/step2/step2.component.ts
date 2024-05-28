import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CmsModalComponent } from 'src/app/shared/comman/cms-modal/cms-modal.component';
import { AddInsuranceModalComponent } from '../add-insurance-modal/add-insurance-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step2', 
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {
  model: NgbDateStruct;

  step2Form: FormGroup;
  step2FormData: any

  constructor(public dialog: MatDialog, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.step2FormData = localStorage.getItem("step2FormData")
    this.loadForm()
  }


  loadForm() {
    this.step2Form = this.fb.group({
      payVia: [this.step2FormData ? this.step2FormData.payVia : '', [Validators.required]],
      relationWithPatient: [this.step2FormData ? this.step2FormData.relationWithPatient : '', [Validators.required]],
      otherRelation: [this.step2FormData ? this.step2FormData.relationWithPatient : ''],
     
      firstName: [this.step2FormData ? this.step2FormData.firstName : '', [Validators.required]],
      middleName: [this.step2FormData ? this.step2FormData.middleName : ''],
      lastName: [this.step2FormData ? this.step2FormData.lastName : '', [Validators.required]],
      dob: [this.step2FormData ? this.step2FormData.dob : '', [Validators.required]],
      martialStatus: [this.step2FormData ? this.step2FormData.martialStatus : '', [Validators.required]],
      gender: [this.step2FormData ? this.step2FormData.gender : '', [Validators.required]],
      email: [this.step2FormData ? this.step2FormData.email : '', [Validators.required]],
      phoneNumber: [this.step2FormData ? this.step2FormData.phoneNumber : '', [Validators.required]],
      cellPhoneNumber: [this.step2FormData ? this.step2FormData.cellPhoneNumber : ''],
      workExtension: [this.step2FormData ? this.step2FormData.workExtension : ''],



      
    });
  }


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
