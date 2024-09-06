import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { validationMessages } from 'src/app/utils/validation-messages';
import { s3Details, pageSize, pageSizeOptions, appointmentStatus, practiceLocations } from 'src/app/config';

export interface PeriodicElement {
  name: string;
  appointmentDate: string;
  action: string;
  status: string;
  patientcheckstatus: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent {
  displayedColumns: string[] = ['name', 'appointmentDate', 'status', 'patientcheckstatus', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  orderBy: any = { updatedAt: -1 }
  whereCond: any = {}
  userQuery: any = {}
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
  fromDate: any = ''
  selectedFromDate: any = ''
  selectedToDate: any = ''
  seachByName: any = ''
  seachById: any = ''
  fieldValues: any = ['Accepted', 'Rescheduled'];
  seachByPatientNameOrEmail: any = ''
  patientQuery: any = {}
  minToDate: Date | null = null;
  maxToDate: Date | null = null;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public authService: AuthService,
    public commonService: CommonService,
    public adminService: AdminService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userBasedQueryChanged() // add condition based on logged in admin user
    this.getAppointmentList('')
  }

  userBasedQueryChanged() {
    let userType = this.authService.getLoggedInInfo('role')
    if (userType == 'support_team') {
      //this.whereCond = Object.assign(this.whereCond, { status: { $in: this.fieldValues } })
    } else {
      //this.whereCond = Object.assign(this.whereCond, { status: { $in: this.fieldValues } })
    }
  }
  searchRecords(event: any, colName: string) {
    let searchStr = event.target.value.trim()
    if (searchStr != '') {
      searchStr = searchStr.replace("+", "\\+");
      let finalStr = { $regex: searchStr, $options: 'i' }
      if (colName == 'byName') {
        this.userQuery = {
          status: "Active",
          role: "therapist",
          $or: [{ firstName: finalStr }, { lastName: finalStr }, { email: finalStr }]
        }
      } else if (colName == 'byId') {
        // this.whereCond = Object.assign(this.whereCond, { appointmentId: searchStr })
        this.whereCond = Object.assign(this.whereCond, { caseName: { $regex: searchStr, $options: 'i' } })
      }else if (colName == 'byPatientNameOrEmail') {
        let firstName = finalStr;
        let lastName = finalStr;
        let final_str = searchStr.trim().split(' ');
        if(final_str[0] && final_str[1]){
          firstName =  { $regex: final_str[0], $options: 'i' }
          lastName =  { $regex: final_str[1], $options: 'i' }
        }
        this.patientQuery = {
          status: "Active",
          $or: [{ firstName: firstName }, { lastName: lastName }, { email: finalStr }]
        }
      }
    } else {
      this.userQuery = {}
      this.whereCond = {};
      this.patientQuery = {}
    }
    this.getAppointmentList('search')
  }

  selectRecords(colName: string, event: any) {
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
    this.fromDate = ''
    this.toDate = ''
    this.selectedFromDate = ''
    this.selectedToDate = ''
    this.practiceLocationsVal = ''
    this.appStatusVal = ''
    this.seachById = ''
    this.seachByName = ''
    this.whereCond = {};
    this.seachByPatientNameOrEmail = ''
    this.patientQuery = {}
    this.getAppointmentList('reset')
  }

  onDateChange(event: any, colName: any) {
    let selectedDate = new Date(event.value);
    let obj = {}
    if (colName == 'fromDate') {
      obj = { $gte: selectedDate }
      this.selectedFromDate = selectedDate;

      // Set minToDate to one day after the selected fromDate
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      this.minToDate = nextDay;
    } else {
      obj = { $lte: selectedDate }
      this.selectedToDate = selectedDate;

      // Set maxToDate to one day after the selected fromDate
      const maxDay = new Date(selectedDate);
      maxDay.setDate(selectedDate.getDate() - 1);
      this.maxToDate = maxDay;
    }
    if (this.selectedFromDate && this.selectedToDate) {
      obj = { $gte: this.selectedFromDate, $lte: this.selectedToDate }
      Object.assign(this.whereCond, { appointmentDate: obj })
    } else {
      Object.assign(this.whereCond, { appointmentDate: obj })
    }
    this.getAppointmentList('search')
  }

  async getAppointmentList(action = "") {
    if (action == "") {
      this.commonService.showLoader()
    }

    let reqVars = {
      query: this.whereCond,
      userQuery: this.userQuery,
      patientQuery: this.patientQuery, 
      fields: { _id: 1, patientId: 1, therapistId: 1, appointmentId: 1, status: 1, caseName: 1, createdAt: 1, updatedAt: 1, practiceLocation: 1, appointmentDate: 1, checkIn: 1 },
      patientFields: { firstName: 1, lastName: 1, email: 1, status: 1, profileImage: 1, practiceLocation: 1 },
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
            practiceLocation: element.practiceLocation,
            appointmentId: element.appointmentId,
            checkIn: element.checkIn,
            createdAt: element.updatedAt,
            appointmentDate: element.appointmentDate,
            status: element.status,
            caseName: element.caseName,
            statusFlag: element.status.charAt(0).toLowerCase() + element.status.slice(1),
            patientName: element.patientId?.firstName + " " + element.patientId?.lastName,
            profileImage: s3Details.awsS3Url + s3Details.userProfileFolderPath + element.patientId?.profileImage,
            therapistName: element.therapistId?.firstName + " " + element.therapistId?.lastName,
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
        // appointmentId: order
        caseName: order
      }
    } else {
      this.orderBy = {
        [sortState.active]: order
      }
    }
    this.getAppointmentList()
  }

  async patientCheckIn(event: any, obj: any) {
    if (event.source._checked != undefined) {
      let reqVars = {
        query: { _id: obj.id },
        updateInfo: {
          checkIn: event.source._checked,
        }
      }
      await this.authService.apiRequest('post', 'appointment/updatePatientCheckIn', reqVars).subscribe(async response => {
      })
    }
  }

  navigateToappointmentDetails(appointmentId: string) {
    // this.router.navigate([this.commonService.getLoggedInRoute(), 'appointment-details', appointmentId]);
    this.router.navigate([this.commonService.getLoggedInRoute(), 'appointment-details', appointmentId]);
  }

}