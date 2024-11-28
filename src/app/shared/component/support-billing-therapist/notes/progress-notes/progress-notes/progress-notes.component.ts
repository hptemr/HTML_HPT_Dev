import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-progress-notes', 
  templateUrl: './progress-notes.component.html',
  styleUrl: './progress-notes.component.scss'
})
export class ProgressNoteComponent {
  appointmentId: string;
  public userId: string;
  public userRole: string;
  currentPath = ""
  addendumId: string;
  addendumUrl = ""
  previousUrl = ''
  currentUrl = ""
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

    if(this.currentUrl.split('/')[3]){
      this.currentPath = this.currentUrl.split('/')[3].toString()
    }
  }


  ngOnInit() {   
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')
  }

  loadValue(value:any){
    if(this.currentPath.includes('view')){
      return value+'-view'
    }else{
      return value
    }
  }


}
