import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
@Component({
  selector: 'app-discharge-note', 
  templateUrl: './discharge-note.component.html',
  styleUrl: './discharge-note.component.scss'
})
export class DischargeNoteComponent {
  appointmentId: string;
  public userId: string;
  public userRole: string;
  public userType: string;
  activeUserRoute = this.commonService.getLoggedInRoute()
  constructor(public dialog: MatDialog,  private router: Router, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService) {
    this.route.firstChild?.params.subscribe(params => {
      this.appointmentId = params['appointmentId'];
    });
  }


  ngOnInit() {   
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')
    this.userType = this.authService.getLoggedInInfo('role').replace('_','-')
  }


  navigatation(to:string) {
    if(to=='case-details'){
      this.router.navigate([this.activeUserRoute+'/'+to+'/'+this.appointmentId]);
    }else{
      this.router.navigate([this.activeUserRoute+'/discharge-notes/'+to+'/'+this.appointmentId]);
    }
    
  }


}
