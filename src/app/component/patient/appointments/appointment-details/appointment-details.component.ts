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

export interface PeriodicElement { 
  dateAddedOn: string; 
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am',  
    action : ''
  },  
  { 
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am',  
    action : ''
  },  

  { 
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am',  
    action : ''
  },  

  { 
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am',  
    action : ''
  },  

  { 
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am',  
    action : ''
  },  
];


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

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, public authService: AuthService, public commonService: CommonService) {
    //appId
    this.route.params.subscribe((params: Params) => {
      if (params['appId']) this.appId = params['appId'];
    })
  }


  isShow = false;
  toggleDisplay() {
    this.isShow = !this.isShow;
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
      fields: { practiceLocation: 1, appointmentId: 1, appointmentDate: 1,  patientInfo: 1, relationWithPatient: 1, payVia: 1, payViaInsuranceInfo: 1 },
      patientFields: { _id: 1 },
      therapistFields: { _id: 1 }
    }
    await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', req_vars).subscribe(async response => {
      this.appInfo = response.data.appointmentData
      this.commonService.hideLoader();
    })
  }

  rescheduleModal() {
    const dialogRef = this.dialog.open(RescheduleAppointmentModalComponent, {
      disableClose: true,
      panelClass: ['custom-alert-container', 'rechedule--wrapper'],
      data: {
        appointmentId: this.appId,
        userRole: this.info.role,
        userId: this.info._id,
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result && !result.error) {
        this.commonService.openSnackBar(result.message, "SUCCESS")
        this.router.navigate(['/patient/appointments'])
      }
    })
  }

  writeComment() {
    const dialogRef = this.dialog.open(WriteCommentModalComponent, {
      disableClose: true,
      panelClass: 'custom-alert-container',
      data: {
        appointmentId: this.appId,
        userRole: this.info.role,
        userId: this.info._id,
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result && !result.error) {
        this.commonService.openSnackBar(result.message, "SUCCESS")
        this.router.navigate(['/patient/appointments'])
      }
    })
  }

  viewInsuranveModal() {
    const dialogRef = this.dialog.open(ViewInsuranceModalComponent, {
      panelClass: 'modal--wrapper',
      data: this.appInfo
    });
  }
}
