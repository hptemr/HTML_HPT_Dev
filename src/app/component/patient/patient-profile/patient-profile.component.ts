import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';
import { AuthService } from 'src/app/shared/services/api/auth.service';


@Component({
  selector: 'app-patient-profile', 
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.scss'
})
export class PatientProfileComponent implements OnInit {
  fullName:any
  userType:any
  constructor(private router: Router, public dialog: MatDialog,public authservice:AuthService) {  
   }
  
   ngOnInit() {
    this.fullName = this.authservice.getFullName()
    this.userType = this.authservice.getLoggedInInfo('role')
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
}
