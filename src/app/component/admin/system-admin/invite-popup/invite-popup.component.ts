import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from 'src/app/utils/validation-messages';
 

@Component({
  selector: 'app-invite-popup', 
  templateUrl: './invite-popup.component.html',
  styleUrl: './invite-popup.component.scss'
})
export class InvitePopupComponent { 
  validationMessages = validationMessages; 
  heading:string = '';
  inviteUserForm: FormGroup;
  practiceLocationData :any = []

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
    this.getPracticeLocation()
  }

  initializePasswordForm(){
    this.inviteUserForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      practiceLocation:['', Validators.required]
    });
  }

  async getPracticeLocation() {
    this.practiceLocationData = await this.commonService.getPracticeLocation().catch(()=>[])
  }

  inviteUser(){
    if(this.inviteUserForm.valid){
      this.inviteUserForm.value['userRole']=this.data.userRole
      this.adminService.invite(this.inviteUserForm.value).subscribe({
        next: (res:any) => {
          this.dialogRef.close(res);
        },error: (err:any) => {
          this.dialogRef.close();
          err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
        }
      });
    }
  }

}
