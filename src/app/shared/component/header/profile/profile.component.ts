import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { AuthService } from '../../../../shared/services/api/auth.service';
import { AdminService } from 'src/app/shared/services/api/admin.service';
//import { padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { s3Details } from 'src/app/config';
import { UserService } from '../../../../shared/services/comet-chat/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  fullName: any
  userId: any
  userType: any
  userTypeLable: any = ''
  profileImage: any
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    public adminService: AdminService,
    public commonService: CommonService,
    public userService:UserService
  ) {
  }

  ngOnInit() {
    this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.authService.getLoggedInInfo('profileImage')
    this.fullName = this.authService.getFullName()
    this.userType = this.authService.getLoggedInInfo('role')
    this.userTypeLable = this.commonService.getUserBaseOnRole(this.userType).userTypeLable
    this.userId = this.authService.getLoggedInInfo("_id")
  }

  profile() {
    let redirect = ''
    let user_type = this.userType
    if (user_type == "system_admin") {
      redirect = 'system-admin/manage-profile'
    } else if (user_type == "practice_admin") {
      redirect = 'practice-admin/manage-profile'
    } else if (user_type == "support_team") {
      redirect = 'support-team/manage-profile'
    } else if (user_type == "therapist") {
      redirect = 'therapist/manage-profile'
    } else if (user_type == "billing_team") {
      redirect = 'billing-team/manage-profile'
    } else if (user_type == "patient") {
      redirect = 'patient/manage-details'
    } else {
      redirect = ''
    }
    window.location.href = '/' + redirect
  }

  logOut() {
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      panelClass: 'custom-alert-container',
      data: {
        warningNote: 'Are you sure you want to log out?'
      }
    })
    dialogRef.afterClosed().subscribe(async(result) => {
      if (result) { 
        let req_vars = { _id: this.userId, userType: this.userType }
        if(this.userType!='patient'){
          await this.userService.logoutUser().catch(res=> false) // Logout user from comet chat
        }
        this.authService.logout(this.userType)
        this.authService.apiRequest('post', 'auth/logout', req_vars).subscribe(result => { })
      }
    })
  }
}
