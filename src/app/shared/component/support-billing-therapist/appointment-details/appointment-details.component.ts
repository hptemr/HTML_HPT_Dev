import { Component,OnInit, ViewChild } from '@angular/core';
import { SystemFollowupModalComponent } from '../system-followup-modal/system-followup-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { RescheduleAppointmentModalComponent } from 'src/app/shared/comman/reschedule-appointment-modal/reschedule-appointment-modal.component';
import { WriteCommentModalComponent } from 'src/app/shared/comman/write-comment-modal/write-comment-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'; 
import { OnePageNoteModalComponent } from './one-page-note-modal/one-page-note-modal.component';
import { CaseNoteModalComponent } from '../notes/case-note-modal/case-note-modal.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { s3Details } from 'src/app/config';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
export interface PeriodicElement {
  note: string;  
  dateAddedOn: string;   
  noteAddedOn: string;
  status: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    note: 'Case Note',   
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Initial Examination',   
    dateAddedOn: 'Fri, Nov 09, 2023 10:00 am', 
    noteAddedOn: 'Mark Swift',
    status: 'Finalized',
    action : ''
  }, 
  { 
    note: 'Daily Note',   
    dateAddedOn: 'Thu, Nov 08, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Draft',
    action : ''
  },
  { 
    note: 'Case Note',   
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Initial Examination',   
    dateAddedOn: 'Fri, Nov 09, 2023 10:00 am', 
    noteAddedOn: 'Mark Swift',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Daily Note',   
    dateAddedOn: 'Thu, Nov 08, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Draft',
    action : ''
  },
  { 
    note: 'Case Note',   
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Initial Examination',   
    dateAddedOn: 'Fri, Nov 09, 2023 10:00 am', 
    noteAddedOn: 'Mark Swift',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Daily Note',   
    dateAddedOn: 'Thu, Nov 08, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Finalized',
    action : ''
  },
  { 
    note: 'Case Note',   
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Finalized',
    action : ''
  }, 
  { 
    note: 'Initial Examination',   
    dateAddedOn: 'Fri, Nov 09, 2023 10:00 am', 
    noteAddedOn: 'Mark Swift',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Daily Note',   
    dateAddedOn: 'Thu, Nov 08, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Finalized',
    action : ''
  },
];

@Component({
  selector: 'app-appointment-details', 
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss'
})
export class AppointmentDetailsComponent implements OnInit {
  appointmentId: string;
  statusFlag: string;
  app_data: any = [];
  appointmentData: any = [];
  appointment_flag: boolean = false
  profileImage: string = '';
  assign_therapist: string = '';
  public userId: string;
  public userRole: string;
  model: NgbDateStruct;
  appointment: any = null
  activeUserRoute = this.commonService.getLoggedInRoute()

  displayedColumns: string[] = ['note', ' dateAddedOn', 'noteAddedOn', 'status' ,'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _liveAnnouncer: LiveAnnouncer,public dialog: MatDialog,  private router: Router, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService,private appointmentService: AppointmentService) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }
  
  ngOnInit() {
    //localStorage.removeItem('appointments');
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')
    this.appointmentService.currentAppointment.subscribe(appointment => this.appointment = appointment)

    // if (this.userRole == 'support_team') {
    //   this.isFormEditable = true
    // } else {
    //   this.appoitmentForm.disable()
    // }
     this.getAppointmentDetails()
    // this.getTherapistList()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
 
  async getAppointmentDetails() {
    if (this.appointmentId) {
      this.commonService.showLoader();
      let reqVars = {
        query: { _id: this.appointmentId },
        fields: {},
        patientFields: { _id: 1, firstName: 1, lastName: 1, profileImage: 1,email:1,phoneNumber:1 },
        therapistFields: { _id: 1, firstName: 1, lastName: 1, profileImage: 1 }
      }

      await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', reqVars).subscribe(async response => {
        this.commonService.hideLoader();
        if (response.data && response.data.appointmentData) {
          this.appointmentData = response.data.appointmentData;
          this.statusFlag = this.appointmentData.status.charAt(0).toLowerCase() + this.appointmentData.status.slice(1)
          this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.appointmentData.patientId.profileImage
          this.appointment_flag = true;

          //this.appointmentService.addAppointment(this.appointmentId,this.appointmentData)
          //console.log('>>>>',this.-)
          // this.appointmentService.currentAppointment.subscribe(appointment => this.appointment = appointment)
          // if(this.appointment){
          //   //this.appointment.push(this.appointmentData)
          //   //this.appointmentService.changeAppointment(this.appointment)
          // }
          this.app_data[this.appointmentId] = this.appointmentData;
          this.appointmentService.addAppointmentData(this.appointmentId,this.appointmentData)          
          
          //this.appointmentService.currentAppointment.subscribe(appointment => this.appointment = appointment)
          
        }
      })
    }
  }


  systemFollowup() {
    const dialogRef = this.dialog.open(SystemFollowupModalComponent,{
      panelClass: 'custom-alert-container', 
    });
  }

  rescheduleModal(){
    const dialogRef = this.dialog.open(RescheduleAppointmentModalComponent,{
      panelClass: ['custom-alert-container', 'rechedule--wrapper'],
    });
  }
  writeComment(){
    const dialogRef = this.dialog.open(WriteCommentModalComponent,{
      panelClass: 'custom-alert-container',
    });
  }

  caseNoteModal() {
    const dialogRef = this.dialog.open(CaseNoteModalComponent,{
       panelClass: [ 'custom-alert-container','modal--wrapper'],
      data : {
        appointmentId:this.appointmentId
      }
    });

  }

  noteModal() {
    const dialogRef = this.dialog.open(OnePageNoteModalComponent,{
      width:"960px",
      // panelClass: [ 'custom-alert-container','modal--wrapper'],
    });
  } 

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) { 
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // navigateToappointmentDetails(requestId: string) {
  //   this.router.navigate([this.commonService.getLoggedInRoute(), 'create-request-appointment',requestId]);
  // }

}
