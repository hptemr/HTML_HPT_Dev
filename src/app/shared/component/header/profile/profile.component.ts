import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { AuthService } from '../../../../shared/services/api/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userData : any;
  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private authService:AuthService
  ) { 
    let userData:any = localStorage.getItem('user');
    this.userData = (userData && userData!=null)?JSON.parse(userData):null
  }

  logOut() {
    const dialogRef = this.dialog.open(AlertComponent,{
      disableClose :true,
      panelClass: 'custom-alert-container',
      data : {
        warningNote: 'Are you sure you want to log out?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.authService.logout()
      }
    });
  }

}
