import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';

@Component({
  selector: 'app-therapists-admin-profile', 
  templateUrl: './therapists-admin-profile.component.html',
  styleUrl: './therapists-admin-profile.component.scss'
})
export class TherapistsAdminProfileComponent {
  constructor(private router: Router, public dialog: MatDialog) { }

  deleteAccount() {
    const dialogRef = this.dialog.open(AlertComponent,{
      panelClass: 'custom-alert-container',
    });
  }
}
