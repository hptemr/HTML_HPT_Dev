import { Component, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { SystemFollowupModalComponent } from '../system-followup-modal/system-followup-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-appointment-details', 
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss'
})
export class AppointmentDetailsComponent {
  appointmentId: string;
  statusFlag: string;
  appointmentData: any = [];
  appointment_flag:boolean=false
  initialName: string = '';

  constructor(public dialog: MatDialog,private navigationService: NavigationService,private router: Router, private route: ActivatedRoute,public authService:AuthService,public commonService:CommonService) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {
    this.getAppointmentDetail()
  }

  async getAppointmentDetail() {
    if(this.appointmentId){ 
      this.commonService.showLoader(); 
      let reqVars = {
        query: {_id:this.appointmentId},
        fields:{},
        patientFields:{},
        therapistFields:{}
      }

      await this.authService.apiRequest('post', 'appointment/getAppointmentDetail', reqVars).subscribe(async response => {
        this.commonService.hideLoader();
        if(response.data && response.data.appointmentData){
          this.appointmentData = response.data.appointmentData;
          this.statusFlag = this.appointmentData.status.charAt(0).toLowerCase() + this.appointmentData.status.slice(1)
          if(this.appointmentData.patientId.firstName && this.appointmentData.patientId.lastName){
            this.initialName = this.appointmentData.patientId.firstName.charAt(0)+this.appointmentData.patientId.lastName.charAt(0);
          }          
          this.appointment_flag = true;
        }
      })
    }
  }

  async patientCheckIn(event: any, obj: any) {
    if (event.source._checked!=undefined) {
      let reqVars = {
        query: { _id: obj._id },
        updateInfo: {
          checkIn: event.source._checked,
        }
      }
      await this.authService.apiRequest('post', 'appointment/updatePatientCheckIn', reqVars).subscribe(async response => {
        //this.getAppointmentList()     
      })
    }
  }


  getPreviousPageLink(): string | null {
    if(this.navigationService.getPreviousUrl()){
      return this.navigationService.getPreviousUrl();
    }else{
      return "/support-team/dashboard";      
    }    
  }

  systemFollowup() {
    const dialogRef = this.dialog.open(SystemFollowupModalComponent,{
      panelClass: 'custom-alert-container', 
    });
  }
}
