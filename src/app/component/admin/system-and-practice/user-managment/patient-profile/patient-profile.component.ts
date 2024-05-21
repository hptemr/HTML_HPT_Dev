import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { s3Details } from 'src/app/config';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.scss'
})
export class PatientProfileComponent {
  patientId: any
  patientData: any
  profileImage: any
  documentsLink: any
  constructor(private router: Router, public dialog: MatDialog, public authService: AuthService,
    private commonService: CommonService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.patientId = params['userId']
    })
  }

  ngOnInit() {
    this.commonService.showLoader()
    this.getUserDetails()
  }

  async getUserDetails() {
    let reqVars = {
      query: { _id: this.patientId }
    }
    await this.authService.apiRequest('post', 'patients/getPatientData', reqVars).subscribe(async response => {
      this.patientData = response.data.patientData
      this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.patientData.profileImage

      let req_vars = {
        query: { _id: this.patientId },
        fileName: this.patientData.document_temp_name
      }
      await this.authService.apiRequest('post', 'patients/getPreviewDocument', req_vars).subscribe(async response => {
        this.commonService.hideLoader()
        if (response.error) {
          this.commonService.openSnackBar(response.message, "ERROR")
        } else {
          let profile = response.data;
          this.documentsLink = profile.document;
        }
      })
    })
  }
  getNumber(numberVal: any) {
    let no = '-'
    if (numberVal != '') {
      no = "+1 " + numberVal
    }
    return no
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
      panelClass: 'change--password--modal',
    });
  }

  navigateToAdminUserDetails() {
    this.router.navigate([this.commonService.getLoggedInRoute() + '/patients/list']);
  }
}
