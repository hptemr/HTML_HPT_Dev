import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { validationMessages } from '../../../../../utils/validation-messages';
import { CommonService } from '../../../../../shared/services/helper/common.service';
import { regex } from '../../../../../utils/regex-patterns';
import { AdminService } from '../../../../../shared/services/api/admin.service';
import { practiceLocations, s3Details } from 'src/app/config';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { UploadImgComponent } from 'src/app/shared/component/upload-img/upload-img.component';
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss'
})
export class AdminProfileComponent {
  @ViewChild('locationSelect') locationSelect: ElementRef;

  validationMessages = validationMessages
  practiceAdminProfileForm: FormGroup;
  adminId: string;
  convertPhoneNumber: string = '';
  practiceLocationData: string[] = practiceLocations
  selectedLocations: string[] = [];
  userRole: string = ''
  isTherapist: boolean = false
  editOptions: any = false
  profileImage: any
  showProfileForm: boolean = false
  isDefaultImage:boolean = true

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private adminService: AdminService,
    private authService: AuthService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.adminId = params['adminId'];
    })
  }


  ngOnInit() {
    this.initializeAdminProfile()
    this.getProfile()
  }

  initializeAdminProfile() {
    this.practiceAdminProfileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(regex.alphabetic)]],
      lastName: ['', [Validators.required, Validators.pattern(regex.alphabetic)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required, Validators.pattern(regex.usPhoneNumber)]],
      status: [''],
      practiceLocation: ['']
    });
  }

  // Therapist Fields
  initializeTherapistFields() {
    this.practiceAdminProfileForm.addControl('NPI', this.fb.control('', [Validators.required, Validators.pattern(regex.onlyNumeric)]));
    this.practiceAdminProfileForm.addControl('SSN', this.fb.control('', [Validators.required, Validators.pattern(regex.numericAndSpecialCharacter)]));
    this.practiceAdminProfileForm.addControl('siteLeaderForPracLocation', this.fb.control('', []));
    this.practiceAdminProfileForm.addControl('licenceNumber', this.fb.control('', []));
  }

  getProfile() {
    this.commonService.showLoader() 
      let bodyData = {
        query: { _id: this.adminId },
        params: { profileImage: 1, firstName: 1, lastName: 1, email: 1, phoneNumber: 1, status: 1, practiceLocation: 1, role: 1, NPI: 1, SSN: 1, siteLeaderForPracLocation: 1, licenceNumber: 1 }
      }
      this.adminService.profile(bodyData).subscribe({
        next: (res) => {
          this.commonService.hideLoader() 
          this.showProfileForm = true
          if (res && !res.error) {
            this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + res.data.profileImage
            this.isDefaultImage =  res.data.profileImage== 'default.png'?false:true
            this.practiceAdminProfileForm.controls['firstName'].setValue(res.data ? res.data.firstName : '');
            this.practiceAdminProfileForm.controls['lastName'].setValue(res.data ? res.data.lastName : '');
            this.practiceAdminProfileForm.controls['email'].setValue(res.data ? res.data.email : '');
            this.practiceAdminProfileForm.controls['phoneNumber'].setValue(res.data ? res.data.phoneNumber : '');
            this.practiceAdminProfileForm.controls['status'].setValue(res.data ? res.data.status : '');
            this.selectedLocations = res.data.practiceLocation
            this.userRole = res.data.role

            // Therapist Fields
            if (this.userRole == 'therapist') {
              this.initializeTherapistFields()
              this.practiceAdminProfileForm.controls['siteLeaderForPracLocation'].setValue((res.data && res.data.siteLeaderForPracLocatio)? res.data.siteLeaderForPracLocation : '');
              this.practiceAdminProfileForm.controls['NPI'].setValue((res.data && res.data.NPI)? res.data.NPI : '');
              this.practiceAdminProfileForm.controls['SSN'].setValue((res.data && res.data.SSN)? res.data.SSN : '');
              this.practiceAdminProfileForm.controls['licenceNumber'].setValue((res.data && res.data.licenceNumber)? res.data.licenceNumber : '');
              this.isTherapist = true
            }
          }
        }, error: (err) => {
          this.commonService.hideLoader() 
          this.showProfileForm = true
          err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
        }
      });
  }

  updatePracticeAdminProfile() {
    if (this.practiceAdminProfileForm.valid) {
      this.practiceAdminProfileForm.value['practiceLocation'] = this.selectedLocations
      this.practiceAdminProfileForm.value['userId'] = this.adminId
      this.practiceAdminProfileForm.value['clickAction'] = 'update'
      this.updateProfile(this.practiceAdminProfileForm.value)
    }
  }

  updateProfile(profileData: any) {
    this.adminService.updateProfile(profileData).subscribe({
      next: (res) => {
        if (res && !res.error) {
          this.commonService.openSnackBar(res.message, "SUCCESS")
          // this.getProfile()
          this.navigateToAdminUserList()
        }
      }, error: (err) => {
        err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
      }
    });
  }

  onPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.convertPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(AlertComponent, {
      panelClass: 'custom-alert-container',
      data: {
        warningNote: 'Do you really want to delete this account?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && !result.error) {
        let delBody = {
          userId: this.adminId,
          status: 'Deleted',
          clickAction: 'delete'
        }
        this.updateProfile(delBody)
      }
    });
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      panelClass: 'change--password--modal',
      data: {
        userId: this.adminId,
        userRole: this.userRole
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result>>>", result)
    });
  }

  removeLocation(location: any): void {
    const index = this.selectedLocations.indexOf(location);
    if (index !== -1) {
      this.selectedLocations.splice(index, 1);
    }
  }

  onLocationChange(event: any) {
    if (event.target.value && !this.selectedLocations.includes(event.target.value)) {
      this.selectedLocations.push(event.target.value);
    }
    this.locationSelect.nativeElement.selectedIndex = 0;
  }

  navigateToAdminUserList() {
    this.router.navigate([this.commonService.getLoggedInRoute()+'/user-managment/'+ this.commonService.getUrlSegmentBaseOnRole(this.userRole)]);
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
          userId: this.adminId,
          profileImage: result.image.base64
        }
        await this.authService.apiRequest('post', 'admin/changeProfileImage', reqVars).subscribe(async response => {
          this.commonService.hideLoader()
          this.commonService.openSnackBar(response.message, "SUCCESS")
          setTimeout(function () {
            location.reload();
          }, 3000)
        })
      }else{
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
          userId: this.adminId
        }
        await this.authService.apiRequest('post', 'admin/deleteProfileImage', reqVars).subscribe(async response => {
          this.commonService.openSnackBar(response.message, "SUCCESS")
          setTimeout(function () {
            location.reload();
          }, 3000);
        })
      }
    })
  }

  checkSpace(colName: any, event: any) {
    this.practiceAdminProfileForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

}
