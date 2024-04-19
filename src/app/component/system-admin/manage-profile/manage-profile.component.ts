import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';
import { FormBuilder, FormGroup, AbstractControl, Validators} from '@angular/forms';
import { SystemAdminService } from '../../../shared/services/api/system-admin.service';
import { CommonService } from '../../../shared/services/helper/common.service';
import { validationMessages } from '../../../utils/validation-messages'

@Component({
  selector: 'app-manage-profile', 
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.scss'
})
export class ManageProfileComponent {
  validationMessages = validationMessages
  updateProfileForm: FormGroup;

  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private fb: FormBuilder,
    private systemAdminService:SystemAdminService,
    private commonService:CommonService
  ) { }

  ngOnInit() {
    this.initializeUpdateProfileForm()
    this.getProfile()
  }

  initializeUpdateProfileForm(){
    this.updateProfileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: [{value:'',disabled: true}]
    });
  }

  getProfile(){
    this.systemAdminService.profile().subscribe({
      next: (res) => {
        if(res && !res.error){
          this.updateProfileForm.controls['firstName'].setValue(res.data?res.data.firstName:'');
          this.updateProfileForm.controls['lastName'].setValue(res.data?res.data.lastName:'');
          this.updateProfileForm.controls['email'].setValue(res.data?res.data.email:'');
        }
      },error: (err) => {
        err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
      }
    });
  }

  updateProfile(){
    if(this.updateProfileForm.valid){
      this.systemAdminService.updateProfile(this.updateProfileForm.value).subscribe({
        next: (res) => {
          if(res && !res.error){
            this.commonService.openSnackBar(res.message,"SUCCESS")
            this.getProfile()
          }
        },error: (err) => {
          err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
        }
      });
    }
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(AlertComponent,{
      panelClass: 'custom-alert-container',
      data : {
        warningNote: 'Do you really want to delete this account?'
      }
    });
  }
  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent,{
      disableClose :true,
      panelClass: 'change--password--modal',
    });
  }
}
