

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { pageSize, pageSizeOptions, practiceLocations } from 'src/app/config';
import { validationMessages } from 'src/app/utils/validation-messages';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  email: string;
  appointmentDate: string;
  action: string;
}

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})

export class PatientsComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'email', 'appointmentDate', 'action'];
  model: NgbDateStruct;
  patientList: any
  searchPatient: any
  whereCond: any = {}
  totalCount = 0
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  validationMessages = validationMessages;
  orderBy: any = { createdAt: -1 }

  practiceLocationData:string[] = practiceLocations
  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, 
    private adminService: AdminService, private commonService: CommonService,  private router: Router, ) {
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
      Object.assign(this.whereCond, { $or: [{ firstName: finalStr }, { lastName: finalStr }, { email: finalStr }] })
    } else {
      delete this.whereCond['$or'];
    }
    this.getPatientList('search')
  }

  async getPatientList(action='') {
    if(action==''){
      this.commonService.showLoader()
    }
    let params = {
      query: this.whereCond,
      params: { firstName: 1, lastName: 1, email: 1 },
      order: this.orderBy,
      limit: this.pageSize,
      offset: (this.pageIndex * this.pageSize)
    }
    await this.adminService.getPatientList(params).subscribe({
      next: async (response) => {
        this.commonService.hideLoader()
        this.totalCount = response.data.totalCount
        let finalData: any = []
        await response.data.patientList.map((element: any) => {
          let newColumns = {
            id: element._id,
            email: element.email,
            appointmentDate: new Date(),
            name: element.firstName + " " + element.lastName
          }
          finalData.push(newColumns)
        })
        this.patientList = new MatTableDataSource(finalData)
      }, error: (err) => {
        console.log("err>>>>", err);
      }
    });
  }

  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPatientList()
  }

  reset() {
    this.searchPatient =""
    this.whereCond = {} 
    this.totalCount = 0
    this.pageIndex = 0
    this.pageSize = pageSize
    this.pageSizeOptions = pageSizeOptions
    this.getPatientList('reset')
  }

  navigateToAdminUserDetails(userId: any){
    this.router.navigate([ this.commonService.getLoggedInRoute()+ '/patients/patient-details/', userId]);
  }
}
