

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { pageSize, pageSizeOptions, practiceLocations } from 'src/app/config';
import { validationMessages } from 'src/app/utils/validation-messages';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { Sort } from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  email: string;
  gender: string;
  dob: string;
  action: string;
}

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})

export class PatientsComponent {
  displayedColumns: string[] = ['name', 'email', 'gender', 'dob', 'action'];
  patientList: any
  searchPatient: any
  whereCond: any = {}
  totalCount = 0
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  validationMessages = validationMessages;
  orderBy: any = { createdAt: -1 }

  appntDate: any
  practiceLocVal: any = ''
  practiceLocations: any = practiceLocations
  maxFromDate = this.commonService.getMaxAppoinmentFutureMonths()

  constructor(public dialog: MatDialog, private authService: AuthService, private commonService: CommonService, private router: Router,) {
  }

  ngOnInit() {
    this.getPatientList()
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
    this.getPatientList()
  }

  searchRecords() {
    let searchStr = this.searchPatient.trim()
    if (searchStr != '') {
      searchStr = searchStr.replace("+", "\\+");
      let finalStr = { $regex: searchStr, $options: 'i' }
      Object.assign(this.whereCond, {
        $or: [
          { firstName: finalStr },
          { lastName: finalStr },
          { email: finalStr }
        ]
      })
    } else {
      delete this.whereCond['$or'];
    }
    this.getPatientList('search')
  }

  async getPatientList(action = '') {
    if (action == '') {
      this.commonService.showLoader()
    }
    let params = {
      queryMatch: this.whereCond,
      //queryMatch: { 'firstName': "Manoj", 'appmnt.status':'Rescheduled' },
      fields: { firstName: 1, lastName: 1, email: 1, dob: 1, gender: 1 },
      order: this.orderBy,
      limit: this.pageSize,
      offset: (this.pageIndex * this.pageSize)
    }
    await this.authService.apiRequest('post', 'patients/getPatientList', params).subscribe(async response => {
      this.commonService.hideLoader()
      this.totalCount = response.data.totalCount
      let finalData: any = []
      await response.data.patientList.map((element: any) => {
        let newColumns = {
          id: element._id,
          email: element.email,
          dob: element.dob,
          gender: element.gender,
          name: element.firstName + " " + element.lastName
        }
        finalData.push(newColumns)
      })
      this.patientList = new MatTableDataSource(finalData)
    })
  }

  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPatientList()
  }

  reset() {
    this.searchPatient = ""
    this.practiceLocVal = ''
    this.whereCond = {}
    this.totalCount = 0
    this.pageIndex = 0
    this.pageSize = pageSize
    this.pageSizeOptions = pageSizeOptions
    this.getPatientList('reset')
  }

  navigateToAdminUserDetails(userId: any) {
    this.router.navigate([this.commonService.getLoggedInRoute() + '/patients/patient-details/', userId]);
  }

  filterDropDown(event: any, colName: any) {
    if (event.target.value != "") {
      Object.assign(this.whereCond, { 'appmnt.practiceLocation': event.target.value })
    } else {
      delete this.whereCond['appmnt.practiceLocation'];
    }
    this.getPatientList('search')
  }

}
