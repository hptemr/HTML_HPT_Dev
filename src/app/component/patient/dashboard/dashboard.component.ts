import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { pageSize, pageSizeOptions, practiceLocations, appointmentStatus, s3Details } from 'src/app/config';
import { validationMessages } from 'src/app/utils/validation-messages';
import { AppointmentReqModalComponent } from '../book-appointment/appointment-req-modal/appointment-req-modal.component';

export interface PeriodicElement {
  info: string;
  appointmentDate: string;
  action: string;
  status: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class PatientDashboardComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['info', 'appointmentDate', 'status', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  orderBy: any = { createdAt: -1 }
  whereCond: any = {}
  dayTwo = false;
  dayOne = true;
  model: NgbDateStruct;
  totalCount = 0
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions

  appointmentsList: any
  practiceLocations: any = practiceLocations
  appointmentStatus: any = appointmentStatus
  validationMessages: any = validationMessages

  appointmentList: any
  fromDate: any = ''
  appStatusVal: any = ''
  practiceLocVal: any = ''
  isLoading = true
  appntDate: any
  minAppntDate: any = new Date()
  maxAppntDate = this.commonService.getMaxAppoinmentFutureMonths()

  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    public commonService: CommonService,
    public adminService: AdminService,
  ) { }

  ngOnInit() {
    this.whereCond = {
      status: "Pending",
      appointmentDate: { $gte: new Date() },
      patientId: this.authService.getLoggedInInfo('_id')
    }
    this.getAppointmentList()
  }

  

  async getAppointmentList(action = '') {
    if (action == '') {
      this.commonService.showLoader()
    }
    let reqVars = {
      query: this.whereCond,
      fields: { practiceLocation: 1, appointmentId: 1, appointmentDate: 1, status: 1 },
      patientFields: { firstName: 1 },
      therapistFields: { firstName: 1, lastName: 1, profileImage: 1 },
      order: this.orderBy,
      limit: this.pageSize,
      offset: (this.pageIndex * this.pageSize)
    }
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
      if (this.totalCount > 0) {
        this.dayTwo = true;
        this.dayOne = false;
      }
      this.appointmentList = new MatTableDataSource(finalData)
      this.isLoading = false
    })
  }

  onDateChange(event: any) {
    Object.assign(this.whereCond, { appointmentDate: { $gte: new Date(event.target.value) } })
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
  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAppointmentList()
  }

  reset() {
    this.whereCond = {
      status: "Pending",
      appointmentDate: { $gte: new Date() },
      patientId: this.authService.getLoggedInInfo('_id')
    }
    this.totalCount = 0
    this.pageIndex = 0
    this.pageSize = pageSize
    this.pageSizeOptions = pageSizeOptions
    this.practiceLocVal = ''
    this.appStatusVal = ''
    this.appntDate = null
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
