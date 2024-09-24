import { Component } from '@angular/core';
// import { SystemFollowupModalComponent } from '../system-followup-modal/system-followup-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { WriteCommentModalComponent } from 'src/app/shared/comman/write-comment-modal/write-comment-modal.component';
import { RescheduleAppointmentModalComponent } from 'src/app/shared/comman/reschedule-appointment-modal/reschedule-appointment-modal.component';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';
import {  ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { ShareModalComponent } from 'src/app/shared/comman/share-modal/share-modal.component';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { s3Details } from 'src/app/config';

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
  selector: 'app-case-details', 
  templateUrl: './case-details.component.html',
  styleUrl: './case-details.component.scss'
})
export class CaseDetailsComponent {
  showShare= false;
  displayedColumns: string[] = ['note', ' dateAddedOn', 'noteAddedOn', 'status' ,'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  appointmentId: string;
  appointmentData: any = [];
  profileImage: string = '';
  appointment_flag: boolean = false
  casenameList:any = [];
  orderBy: any = { updatedAt: -1 }
  therapistList:any=[];
  selectedTherapistId:string =""

  constructor(
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private route: ActivatedRoute,
    private router: Router,
    public commonService: CommonService,
    public authService:AuthService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {
    this.getAppointmentDetails()
    this.getTherapistList()
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
          // this.statusFlag = this.appointmentData.status.charAt(0).toLowerCase() + this.appointmentData.status.slice(1)
          this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.appointmentData.patientId.profileImage
          this.appointment_flag = true;
          this.selectedTherapistId = this.appointmentData?.therapistId?._id
          // this.app_data[this.appointmentId] = this.appointmentData;
          // this.appointmentService.addAppointmentData(this.appointmentId,this.appointmentData)        
        }
      })
    }
  }

  async getTherapistList() {
    const reqVars = {
      query: { role: 'therapist', status: 'Active' },
      fields: { _id: 1, firstName: 1, lastName: 1 },
      order: this.orderBy,
    }
    await this.authService.apiRequest('post', 'admin/getTherapistList', reqVars).subscribe(async response => {
      if (response.data && response.data.therapistData) {
        this.therapistList = response.data.therapistData;
      }
    })
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) { 
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  systemFollowup() {
    // const dialogRef = this.dialog.open(SystemFollowupModalComponent,{
    //   panelClass: 'custom-alert-container', 
    // });
  }

  writeComment(){
    const dialogRef = this.dialog.open(WriteCommentModalComponent,{
      panelClass: 'custom-alert-container',
    });
  }
 
  rescheduleModal(){
    const dialogRef = this.dialog.open(RescheduleAppointmentModalComponent,{
      panelClass: ['custom-alert-container', 'rechedule--wrapper'],
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

  shareModal() {
    // const dialogRef = this.dialog.open(ShareModalComponent,{
    //   panelClass: 'custom-alert-container',
    //   data : {
    //     successNote: 'Are you sure you want to share this with billing team?'
    //   }
    // });
    // dialogRef.afterClosed().subscribe(result=>{
    //   this.showShare= result;
    // })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
    
  
  navigateToappointmentDetails(path: string,id:string) {
    this.router.navigate([this.commonService.getLoggedInRoute()+''+path+id]);
  }
}
