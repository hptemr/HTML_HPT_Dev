import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-initial-examination', 
  templateUrl: './initial-examination.component.html',
  styleUrl: './initial-examination.component.scss'
})
export class InitialExaminationComponent {
  appointmentId: string;
  public userId: string;
  public userRole: string;
  userType=""
  previousUrl = ''
  currentUrl = ""
  currentPath = ""
  constructor(public dialog: MatDialog,  private router: Router, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService) {
    this.route.firstChild?.params.subscribe(params => {
      this.appointmentId = params['appointmentId'];
    });
    this.currentUrl = this.router.url;
    this.currentPath = this.currentUrl.split('/')[3].toString()
    // router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.previousUrl = this.currentUrl;
    //     this.currentUrl = event.url;
    //   };
    // });
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
