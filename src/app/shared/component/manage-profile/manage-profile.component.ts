import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonService } from '../../../shared/services/helper/common.service';
import { validationMessages } from '../../../utils/validation-messages';
import { AuthService } from '../../../shared/services/api/auth.service';
import { AdminService } from '../../../shared/services/api/admin.service';
import { regex } from '../../../utils/regex-patterns';

@Component({
  selector: 'app-manage-profile', 
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.scss'
})
export class ManageProfileComponent {
  validationMessages = validationMessages
  updateProfileForm: FormGroup;
  userData : any;
  userRole : string='system_admin'

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private commonService:CommonService,
    private authService:AuthService,
    private adminService:AdminService
  ) { 
    let userData:any = localStorage.getItem('user');
    this.userData = (userData && userData!=null)?JSON.parse(userData):null
  }

  ngOnInit() {
    this.initializeUpdateProfileForm()
    this.getProfile()
  }

  initializeUpdateProfileForm(){
    this.updateProfileForm = this.fb.group({
      firstName: ['', [Validators.required,Validators.pattern(regex.alphabetic)]],
      lastName: ['', [Validators.required,Validators.pattern(regex.alphabetic)]],
      email: [{value:'',disabled: true}]
    });
  }

  getProfile(){
    let bodyData ={
      query: { _id : this.userData._id},
      params: { firstName:1,lastName:1,email:1,phoneNumber:1,status:1,practiceLocation:1 }
    }
    this.adminService.profile(bodyData).subscribe({
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
      this.updateProfileForm.value['userId'] = this.userData._id
      this.updateProfileForm.value['clickAction'] = 'update'
      this.adminService.updateProfile(this.updateProfileForm.value).subscribe({
        next: (res) => {
          if(res && !res.error){
            this.commonService.fetchLoginUserProfile(this.modifyUpdatedProfileData(res.data))
            this.commonService.openSnackBar(res.message,"SUCCESS")
            this.getProfile()
          }
        },error: (err) => {
          err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
        }
      });
    }
  }

  modifyUpdatedProfileData(updateProfileData:any){
    return {
      _id: updateProfileData._id,
      firstName: updateProfileData.firstName,
      lastName: updateProfileData.lastName,
      role: updateProfileData.role
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
      data : {
        userId : this.userData._id,
        userRole: this.userRole
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("changePassword>>>",result)
      if(result){
        this.authService.logout()
      }
    });
  }
}
