import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../shared/services/helper/common.service';
import { validationMessages } from '../../../utils/validation-messages';
import { AuthService } from '../../../shared/services/api/auth.service';
import { AdminService } from '../../../shared/services/api/admin.service';
import { regex } from '../../../utils/regex-patterns';
import { UploadImgComponent } from '../upload-img/upload-img.component';
import { s3Details } from 'src/app/config';


@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.scss'
})
export class ManageProfileComponent {
  validationMessages = validationMessages
  updateProfileForm: FormGroup;
  userType: any;
  editOptions: any = false
  profileImage: any
  isTherapist:boolean = false
  convertPhoneNumber: string = '';
  userId:any
  isDefaultImage:boolean = true

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private commonService: CommonService,
    private authService: AuthService,
    private adminService: AdminService
  ) {
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userType = this.authService.getLoggedInInfo('role')
    this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.authService.getLoggedInInfo('profileImage')
    this.isDefaultImage =  this.authService.getLoggedInInfo('profileImage')== 'default.png'?false:true
    this.initializeUpdateProfileForm()
    this.getProfile()
    if(this.userType == 'therapist'){
      this.initializeTherapistFields()
      this.isTherapist = true
    }
  }

  initializeUpdateProfileForm() {
    this.updateProfileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(regex.alphabetic)]],
      lastName: ['', [Validators.required, Validators.pattern(regex.alphabetic)]],
      email: [{ value: '', disabled: true }]
    });
  }

  // Therapist Fields
  initializeTherapistFields() {
    this.updateProfileForm.addControl('phoneNumber', this.fb.control('', [Validators.required, Validators.pattern(regex.usPhoneNumber)]));
    this.updateProfileForm.addControl('NPI', this.fb.control('', [Validators.required, Validators.pattern(regex.onlyNumeric)]));
    this.updateProfileForm.addControl('SSN', this.fb.control('', [Validators.required, Validators.pattern(regex.numericAndSpecialCharacter)]));
    this.updateProfileForm.addControl('licenceNumber', this.fb.control('', []));
  }

  getProfile() {
    let bodyData = {
      query: { _id: this.userId },
      params: { firstName: 1, lastName: 1, email: 1, phoneNumber: 1, status: 1, practiceLocation: 1, NPI: 1, SSN: 1, licenceNumber: 1 }
    }
    this.adminService.profile(bodyData).subscribe({
      next: (res) => {
        if (res && !res.error) {
          this.updateProfileForm.controls['firstName'].setValue(res.data ? res.data.firstName : '');
          this.updateProfileForm.controls['lastName'].setValue(res.data ? res.data.lastName : '');
          this.updateProfileForm.controls['email'].setValue(res.data ? res.data.email : '');

          // Therapist Fields
          if(this.userType == 'therapist') {
            this.updateProfileForm.controls['phoneNumber'].setValue((res.data && res.data.phoneNumber)? res.data.phoneNumber : '');
            this.updateProfileForm.controls['NPI'].setValue((res.data && res.data.NPI) ? res.data.NPI : '');
            this.updateProfileForm.controls['SSN'].setValue((res.data && res.data.SSN) ? res.data.SSN : '');
            this.updateProfileForm.controls['licenceNumber'].setValue((res.data && res.data.licenceNumber) ? res.data.licenceNumber : '');
          }
        }
      }, error: (err) => {
        err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
      }
    });
  }

  updateProfile() {
    if (this.updateProfileForm.valid) {
      this.updateProfileForm.value['userId'] = this.userId
      this.updateProfileForm.value['clickAction'] = 'update'
      this.adminService.updateProfile(this.updateProfileForm.value).subscribe({
        next: (res) => {
          if (res && !res.error) {
            this.updateAdminInLocalStorage(res.data)
            this.commonService.openSnackBar(res.message, "SUCCESS")
            // this.getProfile()
          }
        }, error: (err) => {
          err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
        }
      });
    }
  }

  updateAdminInLocalStorage(updateProfileData: any) {
    let localSorageUserData: any = this.authService.getLoggedInInfo('all')
    localSorageUserData.firstName = updateProfileData.firstName;
    localSorageUserData.lastName = updateProfileData.lastName;
    localStorage.setItem('user', JSON.stringify(localSorageUserData));
    window.location.reload()
  }

  async changePhoto() {
    this.editOptions = false
    const dialogRef = this.dialog.open(UploadImgComponent, {
      width: '600px',
      disableClose: true,
      data: { cropperFor: 'Profile Picture' }
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.commonService.showLoader()
      if (result !== false && result.image !== null && result.image !== undefined) {
        let reqVars = {
          userId: this.authService.getLoggedInInfo('_id'),
          profileImage: result.image.base64
        }
        await this.authService.apiRequest('post', 'admin/changeProfileImage', reqVars).subscribe(async response => {
          this.commonService.hideLoader()
          let userDetails: any
          userDetails = this.authService.getLoggedInInfo()
          userDetails.profileImage = this.authService.getLoggedInInfo('_id').toString() + '.png'
          localStorage.setItem('user', JSON.stringify(userDetails))
          this.commonService.openSnackBar(response.message, "SUCCESS")
          setTimeout(function () {
            location.reload();
          }, 3000)
        })
      } else {
        this.commonService.hideLoader()
      }
    })

  }

  editProfile() {
    this.editOptions = !this.editOptions;
  }

  removePhoto() {
    this.editOptions = false
    const dialogRef = this.dialog.open(AlertComponent, {
      panelClass: 'custom-alert-container',
      data: {
        warningNote: 'Do you really want to remove this image?'
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        let reqVars = {
          userId: this.authService.getLoggedInInfo('_id')
        }
        await this.authService.apiRequest('post', 'admin/deleteProfileImage', reqVars).subscribe(async response => {
          let userDetails: any
          userDetails = this.authService.getLoggedInInfo()
          userDetails.profileImage = response.data
          localStorage.setItem('user', JSON.stringify(userDetails))
          this.commonService.openSnackBar(response.message, "SUCCESS")
          setTimeout(function () {
            location.reload();
          }, 3000);
        })
      }
    })
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      disableClose: true,
      panelClass: 'change--password--modal',
      data: {
        userId: this.userId,
        userRole: this.userType
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.authService.logout(this.userType)
      }
    });
  }

  checkSpace(colName: any, event: any) {
    this.updateProfileForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  onPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.convertPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }
}
