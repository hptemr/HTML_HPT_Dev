import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { validationMessages } from 'src/app/utils/validation-messages';
import { s3Details, pageSize, pageSizeOptions, practiceLocations, appointmentStatus } from 'src/app/config';

export interface PeriodicElement {
  name: string;
  updatedAt: string;
  action: string;
  status: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-appointment-requests',
  templateUrl: './appointment-requests.component.html',
  styleUrl: './appointment-requests.component.scss'
})

export class AppointmentRequestsComponent {
  displayedColumns: string[] = ['name', 'appointmentDate', 'status', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  orderBy: any = { updatedAt: -1 }
  whereCond: any = {}
  dayTwo = false;
  dayOne = true;
  dayOneFlag: boolean = true;

  totalCount = 0
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  searchQuery: any = ""
  appointmentsList: any
  practiceLocations: any = practiceLocations
  appointmentStatus: any = appointmentStatus
  validationMessages: any = validationMessages
  appStatusVal: any = ''
  practiceLocationsVal: any = ''
  toDate: any = ''
  fieldValues: any = ['Accepted', 'Rescheduled'];
  eodDate: any
  maxToDate = this.commonService.getMaxAppoinmentFutureMonths()
  minToDate = new Date()
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public authService: AuthService,
    public commonService: CommonService,
    public adminService: AdminService,
  ) { }


  ngOnInit() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.eodDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    this.userBasedQueryChanged()
    this.getAppointmentList('')
  }

  userBasedQueryChanged() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let userType = this.authService.getLoggedInInfo('role')
    if (userType == 'support_team') {
      this.whereCond = Object.assign(this.whereCond, { status: { $in: this.fieldValues }, appointmentDate: { $gte: today, $lte: this.eodDate } })
    } else {
      this.whereCond = Object.assign(this.whereCond, { status: { $in: this.fieldValues }, appointmentDate: { $gte: today } })
    }
  }

  searchRecords(colName: string, event: any) {
    if (event && event != '') {
      Object.assign(this.whereCond, { [colName]: { $in: event } })
    } else {
      delete this.whereCond[colName];
    }
    this.getAppointmentList('search')
  }

  reset() {
    this.totalCount = 0
    this.pageIndex = 0
    this.pageSize = pageSize
    this.pageSizeOptions = pageSizeOptions
    this.toDate = ''
    this.practiceLocationsVal = ''
    this.appStatusVal = ''
    this.whereCond = {};
    this.userBasedQueryChanged()
    this.getAppointmentList('reset')
  }

  onDateChange(event: any) {
    const today = new Date(event.value);
    today.setHours(0, 0, 0, 0);
    Object.assign(this.whereCond, { status: { $in: this.fieldValues }, appointmentDate: { $gte: today, $lte: this.eodDate } })
    this.getAppointmentList('search')
  }

  async getAppointmentList(action = "") {
    if (action == "") {
      this.commonService.showLoader()
    }
    let reqVars = {
      query: this.whereCond,
      userQuery: '',
      fields: { _id: 1, patientId: 1, therapistId: 1, appointmentId: 1, status: 1, createdAt: 1, updatedAt: 1, practiceLocation: 1, appointmentDate: 1 },
      patientFields: { firstName: 1, lastName: 1, email: 1, profileImage: 1, status: 1, practiceLocation: 1 },
      order: this.orderBy,
      limit: this.pageSize,
      offset: (this.pageIndex * this.pageSize)
    }
    await this.authService.apiRequest('post', 'appointment/getAppointmentList', reqVars).subscribe(async response => {
      this.commonService.hideLoader()
      this.totalCount = response.data.totalCount
      let finalData: any = []
      if (response.data.appointmentList.length > 0) {
        await response.data.appointmentList.map((element: any) => {
          let newColumns = {
            id: element._id,
            appointmentId: element.appointmentId,
            practiceLocation: element.practiceLocation,
            createdAt: element.updatedAt,
            appointmentDate: element.appointmentDate,
            status: element.status,
            statusFlag: element.status.charAt(0).toLowerCase() + element.status.slice(1),
            patientName: element.patientId?.firstName + " " + element.patientId?.lastName,
            profileImage: s3Details.awsS3Url + s3Details.userProfileFolderPath + element.patientId?.profileImage,
            therapistName: element.therapistId?.firstName + " " + element.therapistId?.lastName
          }
          finalData.push(newColumns)
        })
      }

      if (this.totalCount > 0) {
        this.dayTwo = true;
        this.dayOne = false;
      }
      this.appointmentsList = new MatTableDataSource(finalData)
    })
  }

  resetFilter() {
    this.totalCount = 0
    this.pageIndex = 0
    this.pageSize = pageSize
    this.pageSizeOptions = pageSizeOptions
    this.searchQuery = ""
    this.getAppointmentList("reset")
  }

  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAppointmentList()
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
        appointmentId: order
      }
    } else {
      this.orderBy = {
        [sortState.active]: order
      }
    }
    this.getAppointmentList()
  }


  navigateToappointmentDetails(appointmentId: string) {
    this.router.navigate([this.commonService.getLoggedInRoute(), 'appointment-details', appointmentId]);
  }
}
