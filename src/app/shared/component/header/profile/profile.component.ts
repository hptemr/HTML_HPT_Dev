import { Component } from '@angular/core';
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
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  adminProfile: AdminProfile = { _id:'',firstName: '',lastName: '',role: ''};
  userData : any;
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
    this.getLoginUserProfile()
  }

  getLoginUserProfile(){
    this.commonService.getLoginUserProfile().subscribe({
      next: (res) => {
        if(!res && res==null){  
          this.getProfile()
        }else{
          this.adminProfile = res
        }
      },error: (_err) => {
        this.getProfile()
      }
    });
  }

  getProfile(){
    let bodyData ={
      query: { _id : this.userData._id},
      params: { firstName:1,lastName:1,role:1 }
    }
    this.adminService.profile(bodyData).subscribe({
      next: (res) => {
        if(res && !res.error){
          this.adminProfile = res.data
        }
      },error: (_err) => {}
    });
  }

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
