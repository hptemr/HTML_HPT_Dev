import { Component, ViewChild, viewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router'; 
import { RescheduleAppointmentModalComponent } from 'src/app/shared/comman/reschedule-appointment-modal/reschedule-appointment-modal.component';
import { ViewInsuranceModalComponent } from 'src/app/shared/comman/view-insurance-modal/view-insurance-modal.component';
import { WriteCommentModalComponent } from 'src/app/shared/comman/write-comment-modal/write-comment-modal.component';
import { CaseNoteModalComponent } from 'src/app/shared/component/support-billing-therapist/notes/case-note-modal/case-note-modal.component';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'; 
import { appointmentStatus, pageSize, pageSizeOptions, practiceLocations, s3Details } from 'src/app/config';
import { validationMessages } from 'src/app/utils/validation-messages';
import { ViewportScroller } from '@angular/common';
export interface PeriodicElement { 
  dateAddedOn: string; 
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss'
})
export class AppointmentDetailsComponent {
  info: any
  appId: any
  appInfo: any
  profileImage: any
  therapistProfileImage: any
  model: NgbDateStruct;
  private _liveAnnouncer: any;  

  totalCount = 0
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  appointmentList: any
  seachByName: any = ''
  appStatusVal: any = ''
  practiceLocVal: any = ''
  practiceLocations: any = practiceLocations
  validationMessages: any = validationMessages
  orderBy: any = { createdAt: -1 }
  isShow:boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, public authService: AuthService, public commonService: CommonService, private viewportScroller: ViewportScroller) {
    this.route.params.subscribe((params: Params) => {
      if (params['appId']) this.appId = params['appId'];
    })
  }

  ngOnInit() {
    this.commonService.showLoader()
    this.info = this.authService.getLoggedInInfo()
    this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.info.profileImage
    this.getAppointmentDetails()
  }

  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
     
  }

  scrollToTop() {
    setTimeout( () => {
      //this.viewportScroller.scrollToPosition([-150, -80]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000)
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) { 
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  displayedColumns: string[] = [ ' dateAddedOn', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  caseNoteModal() {
    const dialogRef = this.dialog.open(CaseNoteModalComponent,{
      panelClass: [ 'custom-alert-container','modal--wrapper'],
    });
  }


  async getAppointmentDetails() {
    const req_vars = {
      query: { _id: this.appId },
      fields: { practiceLocation: 1, caseName:1, appointmentId: 1, appointmentDate: 1,  patientInfo: 1, relationWithPatient: 1, payVia: 1, payViaInsuranceInfo: 1,intakeFormSubmit:1 },
      patientFields: { _id: 1 },
      therapistFields: { _id: 1, firstName: 1, lastName: 1, profileImage:1 }
    }
    await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', req_vars).subscribe(async response => {
      this.appInfo = response.data.appointmentData
      // this.appointmentData = response.data.appointmentData;
      // this.statusFlag = this.appointmentData.status.charAt(0).toLowerCase() + this.appointmentData.status.slice(1)
      // this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.appInfo.patientId.profileImage
      // this.appointment_flag = true;
      if(this.appInfo && this.appInfo?.therapistId){
        this.therapistProfileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.appInfo?.therapistId.profileImage
      }
      this.scrollToTop()
      this.getAppointmentList()
      this.commonService.hideLoader();
    })
  }


  async getAppointmentList(action = '') { 
    let reqVars = {
      query: {
        patientId: this.authService.getLoggedInInfo('_id'),
        caseName:this.appInfo?.caseName,
        appointmentDate : { $lt: new Date() }
      },
      userQuery: {},
      fields: { caseName:1, practiceLocation: 1, appointmentId: 1, appointmentDate: 1, status: 1,checkIn:1 },
      patientFields: { firstName: 1 },
      therapistFields: { firstName: 1, lastName: 1, profileImage: 1 },
      order: this.orderBy,
      limit: this.pageSize,
      offset: (this.pageIndex * this.pageSize)
    }

    await this.authService.apiRequest('post', 'appointment/getAppointmentList', reqVars).subscribe(async response => {
      this.totalCount = response.data.totalCount
      let finalData: any = []
      await response.data.appointmentList.map((element: any) => {
        if(this.appId!=element._id){
            let info: any = {
              fullName: '',
              profileImage: s3Details.awsS3Url + s3Details.userProfileFolderPath + 'default.png'
            }

            if (element.therapistId) {
              info.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + element.therapistId.profileImage
              info.fullName = element.therapistId.firstName + " " + element.therapistId.lastName
            }

            let newColumns = {
              id: element._id,
              info: info,
              appointmentId: element.appointmentId,
              checkIn: element.checkIn,
              appointmentDate: element.appointmentDate,
              status: element.status,
              statusClass: element.status.toLowerCase(),
              practiceLocation: element.practiceLocation,
            }
            finalData.push(newColumns)
        }
      })
      if(finalData.length>0)this.isShow = true
      this.appointmentList = new MatTableDataSource(finalData)
    })
  }
  


  // rescheduleModal() {
  //   const dialogRef = this.dialog.open(RescheduleAppointmentModalComponent, {
  //     disableClose: true,
  //     panelClass: ['custom-alert-container', 'rechedule--wrapper'],
  //     data: {
  //       appointmentId: this.appId,
  //       userRole: this.info.role,
  //       userId: this.info._id,
  //     }
  //   })

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result && !result.error) {
  //       this.commonService.openSnackBar(result.message, "SUCCESS")
  //       this.router.navigate(['/patient/appointments'])
  //     }
  //   })
  // }

  // writeComment() {
  //   const dialogRef = this.dialog.open(WriteCommentModalComponent, {
  //     disableClose: true,
  //     panelClass: 'custom-alert-container',
  //     data: {
  //       appointmentId: this.appId,
  //       userRole: this.info.role,
  //       userId: this.info._id,
  //     }
  //   })

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result && !result.error) {
  //       this.commonService.openSnackBar(result.message, "SUCCESS")
  //       this.router.navigate(['/patient/appointments'])
  //     }
  //   })
  // }

  viewInsuranveModal() {
    const dialogRef = this.dialog.open(ViewInsuranceModalComponent, {
      panelClass: 'modal--wrapper',
      data: this.appInfo
    });
  }
}
