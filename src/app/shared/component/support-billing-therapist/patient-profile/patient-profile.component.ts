import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { s3Details } from 'src/app/config';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.scss',
  providers: [DatePipe]
})
export class PatientProfileComponent {
  patientId: string = '';
  initialName: string = '';
  profileImage: string = '';
  documentsLink: string = '';
  birthdate: any = '';
  patientData: any = '';
  activeUserRoute = this.commonService.getLoggedInRoute()
  constructor(private router: Router, public dialog: MatDialog, private navigationService: NavigationService, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService, private datePipe: DatePipe) {
    this.route.params.subscribe((params: Params) => {
      this.patientId = params['userId'];
    })
  }

  ngOnInit() {
    this.getPatientDetail()
  }

  async getPatientDetail() {
    let reqVars = {
      query: { _id: this.patientId }
    }
    await this.authService.apiRequest('post', 'patients/getPatientData', reqVars).subscribe(async response => {
      this.patientData = response.data.patientData
      this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.patientData.profileImage
      if (this.patientData.firstName && this.patientData.lastName) {
        this.initialName = this.patientData.firstName.charAt(0) + this.patientData.lastName.charAt(0);
      }
      if (this.patientData.dob) {
        let birthdate = this.patientData.dob.split('T')
        this.birthdate = new Date(birthdate[0]);
      }

      let req_vars = {
        query: { _id: this.patientId },
        fileName: this.patientData.document_temp_name
      }
      this.commonService.showLoader()
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

  navigateToAppointmentDetails() {
    if (this.navigationService.getPreviousUrl()) {
      this.router.navigate([this.navigationService.getPreviousUrl()]);
    } else {
      this.router.navigate([this.activeUserRoute, 'dashboard']);
    }
  }

}
