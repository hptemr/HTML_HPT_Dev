




import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { bookingStatus, pageSize, pageSizeOptions, practiceLocations, s3Details } from 'src/app/config';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from 'src/app/utils/validation-messages';

export interface PeriodicElement {
  info: string;
  //appointmentId: string,
  appointmentDate: string;
  action: string;
  status: string;
}
const ELEMENT_DATA: PeriodicElement[] = []

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['info', 'appointmentDate', 'status', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  model: NgbDateStruct;
  bookingStatus: any = bookingStatus
  practiceLocations: any = practiceLocations
  validationMessages: any = validationMessages
  orderBy: any = { createdAt: -1 }
  whereCond: any = {}
  whereCondPracticeAdmin: any = {}
  practiceAdminList: any = []
  totalCount = 0
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  appointmentList: any

  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, private authService: AuthService,
    public commonService: CommonService, private router: Router) {

  }

  ngOnInit() {
    this.whereCond = { patientId: this.authService.getLoggedInInfo('_id') }
    this.getAppointmentList()
  }

  async getAppointmentList(action = '') {
    if (action == '') {
      this.commonService.showLoader()
    }

    let reqVars = {
      query: this.whereCond,
      fields: { practiceLocation: 1, appointmentId: 1, createdAt: 1, status: 1 },
      patientFields: { firstName: 1 },
      therapistFields: { firstName: 1, lastName: 1, profileImage: 1 },
      order: this.orderBy,
      limit: this.pageSize,
      offset: (this.pageIndex * this.pageSize)
    }
    
    console.log(":whereCond:", this.whereCond)
   
    await this.authService.apiRequest('post', 'appointment/getAppointmentList', reqVars).subscribe(async response => {
      console.log("response", response.data)
      this.commonService.hideLoader()
      this.totalCount = response.data.totalCount
      let finalData: any = []
      await response.data.appointmentList.map((element: any) => {
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
          appointmentDate: element.createdAt,
          status: element.status,
          statusClass: element.status.toLowerCase(),
          practiceLocation: element.practiceLocation,
        }
        finalData.push(newColumns)
      })
      this.appointmentList = new MatTableDataSource(finalData)
    })
  }

  announceSortChange(sortState: Sort) {
    let order
    if (sortState.direction == 'desc') {
      order = -1
    } else {
      order = 1
    }
    if (sortState.active == 'name') {
      this.orderBy = {
        firstName: order
      }
    } else {
      this.orderBy = {
        [sortState.active]: order
      }
    }
    this.getAppointmentList()
  }
  searchRecords() {
    let searchStr = ''//this.searchPatient.trim()
    if (searchStr != '') {
      searchStr = searchStr.replace("+", "\\+");
      let finalStr = { $regex: searchStr, $options: 'i' }
      Object.assign(this.whereCond, { $or: [{ firstName: finalStr }, { lastName: finalStr }, { email: finalStr }] })
    } else {
      delete this.whereCond['$or'];
    }
    this.getAppointmentList('search')
  }

  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAppointmentList()
  }

  reset() {
    this.whereCond = {}
    this.totalCount = 0
    this.pageIndex = 0
    this.pageSize = pageSize
    this.pageSizeOptions = pageSizeOptions
    this.getAppointmentList('reset')
  }

}
