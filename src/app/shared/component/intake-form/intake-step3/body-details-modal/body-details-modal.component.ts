import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { validationMessages } from '../../../../../utils/validation-messages';
import { CommonService } from '../../../../../shared/services/helper/common.service';
import { AuthService } from 'src/app/shared/services/api/auth.service';
@Component({
  selector: 'app-body-details-modal', 
  templateUrl: './body-details-modal.component.html',
  styleUrl: './body-details-modal.component.scss'
})
export class BodyDetailsModalComponent {
  partName:string = '';
  appId:string = '';
  validationMessages = validationMessages; 
  partConcernForm: FormGroup;
  submitButton:boolean = false;
  constructor(
    public dialog: MatDialog,
    private commonService: CommonService,
    private authService: AuthService,
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<BodyDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.partName = data.partName != undefined ? data.partName : this.partName;
    this.appId= data.appId != undefined ? data.appId : this.appId;
  }


  ngOnInit() {
    console.log('partName>>>',this.partName)
    this.partConcernForm = this.fb.group({
      partConcern: ['', [Validators.required]],
    });
  }

  async saveData(data:any) {
    console.log('data>>>',data)
    // this.dialogRef.close( );
    if(this.partConcernForm.valid){
      this.submitButton = true;
      //this.partConcernForm.value['userRole']=this.data.userRole
      const req_vars = {
        query: { _id: this.appId },
        data: data,
      }
      await this.authService.apiRequest('post', 'appointment/updateAppointment', req_vars).subscribe(async response => {
        if (response.error != undefined && response.error == true) {
         // this.router.navigate([this.activeUserRoute, 'appointments'])
        } else {
         
        }
      })
    }
  }

  checkSpace(colName: any, event: any) {
    this.partConcernForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }
}
