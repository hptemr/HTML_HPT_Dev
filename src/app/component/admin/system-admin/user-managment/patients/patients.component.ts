

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvitePopupComponent } from '../../invite-popup/invite-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { query } from '@angular/animations';
import { pageSize, pageSizeOptions } from 'src/app/config';
import { validationMessages } from 'src/app/utils/validation-messages';
import { CommonService } from 'src/app/shared/services/helper/common.service';

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
  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, private adminService: AdminService, private commonService: CommonService) { }

  ngOnInit() {
    this.getPatientList()
  }
  ngAfterViewInit() {
    this.patientList.sort = this.sort;
    this.patientList.paginator = this.paginator;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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
    this.getPatientList()
  }
  async getPatientList() {
    this.commonService.showLoader()
    let params = {
      query: this.whereCond,
      params: { firstName: 1, lastName: 1, email: 1 }
    }
    await this.adminService.getPatientList(params).subscribe({
      next: async (response) => {
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
        this.commonService.hideLoader()
      }, error: (err) => {
        console.log("err>>>>", err);
      }
    });
  }
  handlePageEvent(event: any) {

  }
  reset() {
    window.location.reload()
  }
}
