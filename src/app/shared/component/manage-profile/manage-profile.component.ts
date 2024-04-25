import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from 'src/app/utils/validation-messages';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { AdminService } from 'src/app/shared/services/api/admin.service';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.scss'
})
export class ManageProfileComponent {
  validationMessages = validationMessages
  updateProfileForm: FormGroup;
  userData: any;
  userRole: string = 'system_admin'

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private commonService: CommonService,
    private authService: AuthService,
    private adminService: AdminService
  ) {
    let userData: any = localStorage.getItem('user');
    this.userData = (userData && userData != null) ? JSON.parse(userData) : null
  }

  ngOnInit() {
    this.initializeUpdateProfileForm()
    this.getProfile()
  }

  initializeUpdateProfileForm() {
    this.updateProfileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }]
    });
  }

  getProfile() {
    this.adminService.profile(this.userData._id).subscribe({
      next: (res: any) => {
        if (res && !res.error) {
          this.updateProfileForm.controls['firstName'].setValue(res.data ? res.data.firstName : '');
          this.updateProfileForm.controls['lastName'].setValue(res.data ? res.data.lastName : '');
          this.updateProfileForm.controls['email'].setValue(res.data ? res.data.email : '');
        }
      }, error: (err: any) => {
        err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
      }
    });
  }

  updateProfile() {
    if (this.updateProfileForm.valid) {
      this.updateProfileForm.value['userId'] = this.userData._id
      this.updateProfileForm.value['clickAction'] = 'update'
      this.adminService.updateProfile(this.updateProfileForm.value).subscribe({
        next: (res: any) => {
          if (res && !res.error) {
            this.commonService.openSnackBar(res.message, "SUCCESS")
            this.getProfile()
          }
        }, error: (err: any) => {
          err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
        }
      });
    }
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(AlertComponent, {
      panelClass: 'custom-alert-container',
      data: {
        warningNote: 'Do you really want to delete this account?'
      }
    });
  }
  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      disableClose: true,
      panelClass: 'change--password--modal',
      data: {
        userId: this.userData._id,
        userRole: this.userRole
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("changePassword>>>", result)
      if (result) {
        this.authService.logout()
      }
    });
  }
}
