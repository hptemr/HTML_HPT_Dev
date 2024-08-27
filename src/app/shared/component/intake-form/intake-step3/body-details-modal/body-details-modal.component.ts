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
  bodyPartFront:any = [];
  bodyPartBack:any = [];
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
    this.bodyPartFront= data.bodyPartFront != undefined ? data.bodyPartFront : this.bodyPartFront;
    this.bodyPartBack= data.bodyPartBack != undefined ? data.bodyPartBack : this.bodyPartBack;
  }


  ngOnInit() {
    console.log('partName>>>',this.partName,'------------',this.bodyPartFront)
    //console.log('bodyPartBack-------',this.bodyPartBack)
    this.partConcernForm = this.fb.group({
      concern: ['', [Validators.required]],
    });
    
  }

  async saveData(data:any) {
    //console.log(this.partName,'data>>>',data)
    if(this.partConcernForm.valid){
      this.submitButton = true;

      this.bodyPartFront.push({'part':this.partName,'concern':data.concern});
      const req_vars = {
        query: { _id: this.appId },
        updateInfo: {
          bodyPartFront: this.bodyPartFront
        },
      }
    
   //   console.log('data>>>',req_vars)
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
