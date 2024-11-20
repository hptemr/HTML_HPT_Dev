import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-daily-notes', 
  templateUrl: './daily-notes.component.html',
  styleUrl: './daily-notes.component.scss'
})
export class DailyNotesComponent {
  appointmentId: string;
  public userId: string;
  public userRole: string;
  userType=""
  previousUrl = ''
  currentUrl = ""
  currentPath = ""
  addendumId: string;
  addendumUrl = ""
  constructor(public dialog: MatDialog,  private router: Router, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService) {
    this.route.firstChild?.params.subscribe(params => {
      this.appointmentId = params['appointmentId'];
      this.addendumId = params['addendumId'];
    });
    if(this.addendumId!=undefined){
      this.addendumUrl = this.appointmentId +"/"+this.addendumId
    }else{
      this.addendumUrl = this.appointmentId
    }
    this.currentUrl = this.router.url;
    this.currentPath = this.currentUrl.split('/')[3].toString()
  }


  ngOnInit() {   
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')
    this.userType = this.authService.getLoggedInInfo('role').replace('_','-')
  
  }

  loadValue(value:any){
    if(this.currentPath.includes('view')){
      return value+'-view'
    }else{
      return value
    }
  }

}
