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
  from:string = '';
  concernText:string = '';
  validationMessages = validationMessages; 
  partConcernForm: FormGroup;
  submitButton:boolean = false;
  readOnly:boolean = false;
  bodyPartFront:any = [];
  bodyPartBack:any = [];
  userId = this.authService.getLoggedInInfo('_id')
  userRole = this.authService.getLoggedInInfo('role')
  appointmentUpdateInfo:any = [];
  constructor(
    public dialog: MatDialog,
    private commonService: CommonService,
    private authService: AuthService,
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<BodyDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.partName = data.partName != undefined ? data.partName : this.partName;
    this.appId = data.appId != undefined ? data.appId : this.appId;
    this.from = data.from != undefined ? data.from : this.from;
    this.bodyPartFront = data.bodyPartFront != undefined ? data.bodyPartFront : this.bodyPartFront;
    this.bodyPartBack = data.bodyPartBack != undefined ? data.bodyPartBack : this.bodyPartBack;
    this.appointmentUpdateInfo = data.appointmentUpdateInfo != undefined ? data.appointmentUpdateInfo : [];
    if(data.readOnly){
      this.readOnly= data.readOnly;
    }
    
  }


  ngOnInit() {
    if(this.from=='bodyPartFront'){
      this.bodyPartFront.forEach((element: any) => {
        if(this.partName==element.part){
          this.concernText = element.concern
        }
      });
    }  else  if(this.from=='bodyPartBack'){
      this.bodyPartBack.forEach((element: any) => {
        if(this.partName==element.part){
          this.concernText = element.concern
        }
      });
    }

    this.partConcernForm = this.fb.group({
      concern: [this.concernText, [Validators.required,Validators.minLength(1), Validators.maxLength(100)]],
    });
    if(this.readOnly){
      this.submitButton = true
      this.partConcernForm.get('concern')?.disable();
    }
    
  }

  async saveData(data:any) {
    if(this.partConcernForm.valid){
      this.submitButton = true;
      let params = {};
      if(this.from=='bodyPartFront'){
        this.bodyPartFront.push({'part':this.partName,'concern':data.concern});
        params =  {
          bodyPartFront: this.bodyPartFront
        }
      } else if(this.from=='bodyPartBack'){
        this.bodyPartBack.push({'part':this.partName,'concern':data.concern});
        params = {
          bodyPartBack: this.bodyPartBack
        }
      }
      this.appointmentUpdateInfo.push({
        fromPatientId : (this.userRole=='patient') ? this.userId : '',
        fromAdminId:(this.userRole!='patient') ? this.userId : '',
        userRole:this.userRole,
        updatedAt:new Date()
      });
      Object.assign(params, { appointmentUpdateInfo: this.appointmentUpdateInfo })
      const req_vars = {
        query: { _id: this.appId },
        updateInfo: params,
      }
      await this.authService.apiRequest('post', 'appointment/updateAppointment', req_vars).subscribe(async response => {
        if (response.error != undefined && response.error == true) {
         if(response.message){
          this.commonService.openSnackBar(response.message, "ERROR")
        }    
         this.dialogRef.close(response);
        } else {         
          if(response.message){
            this.commonService.openSnackBar('Your body chart has been updated successfully!', "SUCCESS")
          }          
          this.dialogRef.close(response);
        }
      })
    }else{
        this.partConcernForm.markAllAsTouched();
        return;
    }
  }

  checkSpace(colName: any, event: any) {
    this.partConcernForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }
}
