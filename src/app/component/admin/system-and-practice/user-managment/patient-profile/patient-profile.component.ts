import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-patient-profile', 
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.scss'
})
export class PatientProfileComponent {
  constructor(private router: Router, public dialog: MatDialog,  private commonService: CommonService) { }

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

  navigateToAdminUserDetails(){
    this.router.navigate([ this.commonService.getLoggedInRoute()+ '/patients/list']);
  }
}
