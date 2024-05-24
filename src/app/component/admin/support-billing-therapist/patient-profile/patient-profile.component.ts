import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-patient-profile', 
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.scss'
})
export class PatientProfileComponent {
  constructor(private router: Router, public dialog: MatDialog,private navigationService: NavigationService,public commonService:CommonService) { }

  ngOnInit() {
    this.getPatientDetail()
  }
  
  getPatientDetail(){
    // let reqVars = {
    //   query: { _id: this.patientId }
    // }
    // await this.authService.apiRequest('post', 'patients/getPatientData', reqVars).subscribe(async response => {
    //   this.patientData = response.data.patientData
    //   this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.patientData.profileImage

    //   let req_vars = {
    //     query: { _id: this.patientId },
    //     fileName: this.patientData.document_temp_name
    //   }
    //   await this.authService.apiRequest('post', 'patients/getPreviewDocument', req_vars).subscribe(async response => {
    //     this.commonService.hideLoader()
    //     if (response.error) {
    //       this.commonService.openSnackBar(response.message, "ERROR")
    //     } else {
    //       let profile = response.data;
    //       this.documentsLink = profile.document;
    //     }
    //   })
    // })
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
      panelClass: 'change--password--modal',
    });
  }

  navigateToAppointmentDetails(){
    if(this.navigationService.getPreviousUrl()){
      this.router.navigate([this.navigationService.getPreviousUrl()]);
    }else{
      this.router.navigate([this.commonService.getLoggedInRoute()+ '/dashboard/']);
    } 
  }

}
