import { Component, Inject, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from 'src/app/utils/validation-messages';

@Component({
  selector: 'app-add-insurance-modal',
  templateUrl: './add-insurance-modal.component.html',
  styleUrl: './add-insurance-modal.component.scss'
})
export class AddInsuranceModalComponent {
  isUnique = true
  addInsuranceForm: FormGroup;
  validationMessages = validationMessages

  constructor(private authService: AuthService, public dialogRef: MatDialogRef<AddInsuranceModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private fb: FormBuilder, private commonService: CommonService) {
  }

  ngOnInit() {
    this.addInsuranceForm = this.fb.group({
      insuranceName: new FormControl('', Validators.compose([Validators.pattern("^[ A-Za-z0-9.'-]*$"), Validators.required, Validators.minLength(1), Validators.maxLength(35)])),
    })
  }
  async checkSpace(event: any) {
    let val = this.commonService.capitalize(event.target.value)
    this.addInsuranceForm.controls['insuranceName'].setValue(val)
    if (val.trim() != '') {
      let reqVars = {
        query: { insuranceName: val },
        fields: { insuranceName: 1 },
      }
      await this.authService.apiRequest('post', 'insurance/getInsuranceDetails', reqVars).subscribe(async response => {
        if (response.data.insuranceData) {
          this.isUnique = false
        } else {
          this.isUnique = true
        }
      })
    }
  }

  addInsurance() {
    this.dialogRef.close(this.addInsuranceForm.controls['insuranceName'].value.trim());
  }
}
