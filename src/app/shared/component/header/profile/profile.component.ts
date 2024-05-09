import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { AuthService } from '../../../../shared/services/api/auth.service';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { CommonService } from 'src/app/shared/services/helper/common.service';

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

    this.fullName = this.authService.getFullName()
    this.userType = this.authService.getLoggedInInfo('role')
    //this.getLoginUserProfile()
  }

  // getLoginUserProfile(){
  //   this.commonService.getLoginUserProfile().subscribe({
  //     next: (res) => {
  //       if(!res && res==null){  
  //         this.getProfile()
  //       }else{
  //         this.adminProfile = res
  //         let { userType }= this.commonService.getUserBaseOnRole(res.role)
  //         this.adminProfile['userType']= userType
  //       }
  //     },error: (_err) => {
  //       this.getProfile()
  //     }
  //   });
  // }

  // getProfile(){
  //   let bodyData ={
  //     query: { _id : this.userData._id},
  //     params: { firstName:1,lastName:1,role:1 },
  //   }    
  //   this.adminService.profile(bodyData).subscribe({
  //     next: (res) => {
  //       if(res && !res.error){
  //         this.adminProfile = res.data
  //         let { userType }= this.commonService.getUserBaseOnRole(res.data.role)
  //         this.adminProfile['userType']= userType
  //       }
  //     },error: (_err) => {}
  //   });
  // }

  logOut() {
    console.log(this.userData)
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      panelClass: 'custom-alert-container',
      data: {
        warningNote: 'Are you sure you want to log out?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let req_vars = { _id: this.authService.getLoggedInInfo("_id") }
        this.authService.apiRequest('post', 'auth/logout', req_vars).subscribe(result => {
          this.authService.logout()
        })
      }
    });
  }

}
