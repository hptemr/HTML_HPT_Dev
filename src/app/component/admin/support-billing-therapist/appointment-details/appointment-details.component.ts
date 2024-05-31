import { Component, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { SystemFollowupModalComponent } from '../system-followup-modal/system-followup-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { WriteCommentModalComponent } from 'src/app/shared/comman/write-comment-modal/write-comment-modal.component';
import { RescheduleAppointmentModalComponent } from 'src/app/shared/comman/reschedule-appointment-modal/reschedule-appointment-modal.component';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';
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
  public userId: string;
  public userRole: string;

  constructor(public dialog: MatDialog,private navigationService: NavigationService,private router: Router, private route: ActivatedRoute,public authService:AuthService,public commonService:CommonService) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id') 
    this.userRole = this.authService.getLoggedInInfo('role')  
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
      return this.commonService.getLoggedInRoute()+ '/dashboard/';
      //this.router.navigate([this.commonService.getLoggedInRoute()+ '/dashboard/']);
    }    
  }

  systemFollowup() {
    const dialogRef = this.dialog.open(SystemFollowupModalComponent,{
      panelClass: 'custom-alert-container', 
    });
  }


  writeComment(appointmentId:string){
    const dialogRef = this.dialog.open(WriteCommentModalComponent,{
      disableClose :true,
      panelClass: 'custom-alert-container',
      data : {
       // heading: `Invite ${this.pageTitle}`,
        appointmentId:appointmentId,
        userRole:this.userRole,
        fromId: this.userId,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && !result.error){
        this.getAppointmentDetail();
        this.commonService.openSnackBar(result.message,"SUCCESS")
      }
    });

  }
 
  rescheduleModal(appointmentId:string){
    const dialogRef = this.dialog.open(RescheduleAppointmentModalComponent,{
      disableClose :true,
      panelClass: ['custom-alert-container', 'rechedule--wrapper'],
      data : {
        // heading: `Invite ${this.pageTitle}`,
         appointmentId:appointmentId,
         userRole:this.userRole,
         fromId: this.userId,
       }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result && !result.error){
        this.getAppointmentDetail();
        this.commonService.openSnackBar(result.message,"SUCCESS")
      }
    });
  }

  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote: 'Kindly choose a therapist prior to confirming the appointment request.'
      }
    });
  }

  async acceptAppointment(appointmentId:string){
    if(appointmentId){ 
      //this.commonService.showLoader(); 
      let reqVars = {
        query: {_id:appointmentId},
        fromId: this.userId,
        fromRole:this.userRole      
      }
      await this.authService.apiRequest('post', 'appointment/acceptAppointment', reqVars).subscribe(async response => {
        this.commonService.hideLoader();     
        if (response.error) {
          this.commonService.openSnackBar(response.message, "ERROR")
        }else{
          this.commonService.openSnackBar(response.message, "SUCCESS")
          this.getAppointmentDetail()
          this.successModal(); 
        }        
      })
    }
  }


  navigateTopatientDetails(patientId:string){
    this.router.navigate([this.commonService.getLoggedInRoute()+ '/patient-profile/',patientId]);
  }
}
