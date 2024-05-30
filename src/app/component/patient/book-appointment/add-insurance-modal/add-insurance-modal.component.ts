import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from 'src/app/utils/validation-messages';

@Component({
  selector: 'app-add-insurance-modal',
  templateUrl: './add-insurance-modal.component.html',
  styleUrl: './add-insurance-modal.component.scss'
})
export class AddInsuranceModalComponent {
  @ViewChild("inputBox") _el: ElementRef;
  validationMessages = validationMessages

  addInsuranceForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddInsuranceModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private fb: FormBuilder, private commonService: CommonService) {
  }

  ngOnInit() {
    this.addInsuranceForm = this.fb.group({
      insuranceName: new FormControl('', Validators.compose([Validators.pattern("^[ A-Za-z0-9.'-]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
    })
  }
  checkSpace(event: any) {
    this.addInsuranceForm.controls['insuranceName'].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  addInsurance() {
    this.dialogRef.close(this.addInsuranceForm.controls['insuranceName'].value);
  }
}
