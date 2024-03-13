import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-practice-admin-profile', 
  templateUrl: './practice-admin-profile.component.html',
  styleUrl: './practice-admin-profile.component.scss'
})
export class PracticeAdminProfileComponent {
  constructor(private router: Router, public dialog: MatDialog) { }

  deleteAccount() {
    const dialogRef = this.dialog.open(AlertComponent,{
      panelClass: 'custom-alert-container',
    });
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent,{
      panelClass: 'change--password--modal',
    });
  }
}
