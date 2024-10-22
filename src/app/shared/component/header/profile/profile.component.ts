import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { AuthService } from '../../../../shared/services/api/auth.service';
import { AdminService } from 'src/app/shared/services/api/admin.service';
//import { padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { s3Details } from 'src/app/config';
import { UserService } from '../../../../shared/services/comet-chat/user.service';
import { ProfilePicService } from '../../../../shared/services/profile-pic.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  fullName: any
  userId: any
  userType: any
  userTypeLable: any = ''
  profileImage: any = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.authService.getLoggedInInfo('profileImage');
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    public adminService: AdminService,
    public commonService: CommonService,
    public userService:UserService,
    private picService : ProfilePicService
  ) {
  }

  async ngOnInit(){
    this.picService.itemValue.subscribe((nextValue) => {
      console.log('next value profile component>>>',nextValue)
      if(nextValue)
        this.profileImage =  nextValue
    })

    /*+++++++++
      If profile update by System or Practice admin if any Admin user.
      And that time any Admin user login. so Real time changes reflect through
      this function.
    */ 
    await this.checkProfileDataUpdate().catch(()=>false)
  
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

  checkProfileDataUpdate(){
    return new Promise(async (resolve, reject) => {
      let params = {
        query: { 
          _id: this.authService.getLoggedInInfo("_id"),
          $or: [
            { firstName: { $ne: this.authService.getLoggedInInfo("firstName") } },
            { lastName: { $ne: this.authService.getLoggedInInfo("lastName")} },
            { profileImage: { $ne: this.authService.getLoggedInInfo("profileImage") } }
          ]
        },
        params: { firstName: 1, lastName:1, profileImage:1}
      }
      this.adminService.profile(params).subscribe({
        next: (res:any) => {
          if(!res?.error && res?.data && res?.data!=null){
            let userDetails: any
            userDetails = this.authService.getLoggedInInfo()
            userDetails.firstName = res.data?.firstName
            userDetails.lastName = res.data?.lastName
            userDetails.profileImage = res.data?.profileImage
            localStorage.setItem('user', JSON.stringify(userDetails))
            resolve(true)
          }else{
            resolve(true)
          }
        }, error: (err) => {
          reject()
        }
      })
    })
  }

}
