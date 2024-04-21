import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { validationMessages } from '../../../utils/validation-messages';
import { CommonService } from '../../../shared/services/helper/common.service';
import { PracticeAdminService } from '../../../shared/services/api/practice-admin.service';

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
    private practiceAdminService:PracticeAdminService,
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
    switch (this.data.userRole) {
      case "practice_admin":
        this.invitePracticeAdmin();
        break;
    }
  }

  invitePracticeAdmin(){
    if(this.inviteUserForm.valid){
      this.practiceAdminService.invite(this.inviteUserForm.value).subscribe({
        next: (res) => {
          this.dialogRef.close(res);
        },error: (err) => {
          this.dialogRef.close();
          err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
        }
      });
    }
  }
}
