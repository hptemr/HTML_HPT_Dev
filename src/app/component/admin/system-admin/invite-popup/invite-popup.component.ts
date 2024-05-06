import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { validationMessages } from '../../../../utils/validation-messages';
import { CommonService } from '../../../../shared/services/helper/common.service';
import { AdminService } from '../../../../shared/services/api/admin.service';
import { regex } from '../../../../utils/regex-patterns';
import { practiceLocations } from 'src/app/config';
@Component({
  selector: 'app-invite-popup', 
  templateUrl: './invite-popup.component.html',
  styleUrl: './invite-popup.component.scss'
})
export class InvitePopupComponent { 
  validationMessages = validationMessages; 
  heading:string = '';
  inviteUserForm: FormGroup;
  practiceLocationData:string[] = practiceLocations

  constructor(
    private commonService: CommonService,
    private adminService :AdminService,
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<InvitePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.heading = data.heading != undefined ? data.heading : this.heading;
  }

  ngOnInit() {
    this.initializePasswordForm()
  }

  initializePasswordForm(){
    this.inviteUserForm = this.fb.group({
      firstName: ['', [Validators.required,Validators.pattern(regex.alphabetic)]],
      lastName: ['', [Validators.required,Validators.pattern(regex.alphabetic)]],
      email: ['',[Validators.required, Validators.email]],
      practiceLocation:['', Validators.required]
    });
  }

  inviteUser(){
    if(this.inviteUserForm.valid){
      this.inviteUserForm.value['userRole']=this.data.userRole
      this.adminService.invite(this.inviteUserForm.value).subscribe({
        next: (res) => {
          this.dialogRef.close(res);
        },error: (err) => {
          this.dialogRef.close();
          err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
        }
      });
    }
  }

  checkSpace(colName: any, event: any) {
    this.inviteUserForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

}
