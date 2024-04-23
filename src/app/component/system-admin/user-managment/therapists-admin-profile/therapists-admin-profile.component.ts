import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-therapists-admin-profile', 
  templateUrl: './therapists-admin-profile.component.html',
  styleUrl: './therapists-admin-profile.component.scss'
})
export class TherapistsAdminProfileComponent {
  therapistId:string;
  userRole:string ='therapist'

  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private route: ActivatedRoute,

  ) { 
    this.route.params.subscribe((params: Params) => {
      this.therapistId = params['therapistId'];
    }
  );
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
      data : {
        userId : this.therapistId,
        userRole: this.userRole
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result>>>",result)
    });
  }

}
