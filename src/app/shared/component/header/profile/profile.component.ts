import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { AuthService } from '../../../../shared/services/api/auth.service';
import { AdminService } from 'src/app/shared/services/api/admin.service';
//import { padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { s3Details } from 'src/app/config';

interface AdminProfile {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  userType: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  adminProfile: AdminProfile = { _id:'',firstName: '',lastName: '',role: '', userType:''};
  userData : any;
  fullName:any
  userType:any
  profileImage:any
  constructor( 
    public dialog: MatDialog,
    private authService:AuthService,
    public adminService:AdminService,
    public commonService:CommonService
  ) { 
    let userData:any = localStorage.getItem('user');
    this.userData = (userData && userData!=null)?JSON.parse(userData):null
  }

  ngOnInit() {
    this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.authService.getLoggedInInfo('profileImage')
    this.fullName = this.authService.getFullName()
    let userRole = this.authService.getLoggedInInfo('role')
    this.userType = this.commonService.getUserBaseOnRole(userRole).userType
  }

  logOut() {
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      panelClass: 'custom-alert-container',
      data: {
        warningNote: 'Are you sure you want to log out?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let req_vars = { _id: this.authService.getLoggedInInfo("_id"),userType:this.userType }
        this.authService.apiRequest('post', 'auth/logout', req_vars).subscribe(result => {
          this.authService.logout(this.userType)
        })
      }
    });
  }

}
