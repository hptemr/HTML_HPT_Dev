import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { appointmentStatus, pageSize, pageSizeOptions, practiceLocations, s3Details } from 'src/app/config';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from 'src/app/utils/validation-messages';

export interface PeriodicElement {
  info: string;
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

  appointmentStatus: any = appointmentStatus
  practiceLocations: any = practiceLocations
  validationMessages: any = validationMessages
  orderBy: any = { createdAt: -1 }
  whereCond: any = {}
  userQuery: any = {}

  totalCount = 0
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  appointmentList: any
  seachByName: any = ''
  appStatusVal: any = ''
  practiceLocVal: any = ''

  fromDate: any
  toDate: any
  maxFromDate: any
  maxToDate: any

  minFromDate: any
  minToDate: any

  constructor(public dialog: MatDialog, private authService: AuthService,
    public commonService: CommonService, private router: Router) {
  }

  ngOnInit() {
    let todayDate = this.commonService.getMaxAppoinmentFutureMonths()
    this.maxFromDate = todayDate
    this.maxToDate = todayDate
    this.whereCond = { patientId: this.authService.getLoggedInInfo('_id') }
    this.getAppointmentList()
  }

  async getAppointmentList(action = '') {
    if (action == '') {
      this.commonService.showLoader()
    }

    let reqVars = {
      query: this.whereCond,
      userQuery: this.userQuery,
      fields: { practiceLocation: 1, appointmentId: 1, appointmentDate: 1, status: 1 },
      patientFields: { firstName: 1 },
      therapistFields: { firstName: 1, lastName: 1, profileImage: 1 },
      order: this.orderBy,
      limit: this.pageSize,
      offset: (this.pageIndex * this.pageSize)
    }
    console.log("whereCond:", this.whereCond)
    await this.authService.apiRequest('post', 'appointment/getAppointmentList', reqVars).subscribe(async response => {
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
          appointmentDate: element.appointmentDate,
          status: element.status,
          statusClass: element.status.toLowerCase(),
          practiceLocation: element.practiceLocation,
        }
        finalData.push(newColumns)
      })

      this.appointmentList = new MatTableDataSource(finalData)
    })
  }

  onDateChange(event: any, colName: any) {
    if (colName == 'fromDate') {
      this.minToDate = new Date(event.target.value)
    }
    let dateCond
    if (this.fromDate && this.toDate) {
      dateCond = {
        appointmentDate: {
          $gte: this.fromDate,
          $lte: this.toDate
        }
      }
    } else {
      if (this.fromDate) {
        dateCond = {
          appointmentDate: { $gte: this.fromDate }
        }
      } else {
        dateCond = {
          appointmentDate: { $lte: this.toDate }
        }
      }
    }
    Object.assign(this.whereCond, dateCond)
    this.getAppointmentList('search')
  }

  announceSortChange(sortState: Sort) {
    let order
    if (sortState.direction == 'desc') {
      order = -1
    } else {
      order = 1
    }
    if (sortState.active == 'info') {
      this.orderBy = {
        appointmentId: order
      }
    } else {
      this.orderBy = {
        [sortState.active]: order
      }
    }
    this.getAppointmentList()
  }

  searchRecords(event: any) {
    let searchStr = event.target.value.trim()
    if (searchStr != '') {
      searchStr = searchStr.replace("+", "\\+");
      let finalStr = { $regex: searchStr, $options: 'i' }
      this.userQuery = {
        status: "Active",
        role: "therapist",
        $or: [{ firstName: finalStr }, { lastName: finalStr }, { email: finalStr }]
      }
    } else {
      this.userQuery = {}
    }
    this.getAppointmentList('search')
  }

  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAppointmentList()
  }

  reset() {
    this.userQuery = {}
    this.whereCond = { patientId: this.authService.getLoggedInInfo('_id') }
    this.totalCount = 0
    this.pageIndex = 0
    this.pageSize = pageSize
    this.pageSizeOptions = pageSizeOptions
    this.practiceLocVal = ''
    this.appStatusVal = ''
    this.fromDate = ''
    this.toDate = ''
    this.seachByName = ''
    this.getAppointmentList('reset')
  }

  filterDropDown(event: any, colName: any) {
    if (event.target.value != "") {
      Object.assign(this.whereCond, { [colName]: event.target.value })
    } else {
      delete this.whereCond[colName];
    }
    this.getAppointmentList('search')
  }

}
