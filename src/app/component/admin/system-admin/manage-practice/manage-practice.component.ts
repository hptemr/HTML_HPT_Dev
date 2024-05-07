import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { pageSize, pageSizeOptions, practiceLocations } from 'src/app/config';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { validationMessages } from 'src/app/utils/validation-messages';
import { CommonService } from 'src/app/shared/services/helper/common.service';

export interface PeriodicElement {
  name: string;
  email: string;
  status: string;
  assignAs: string;
  action: string;
}

export interface PeriodicElement2 {
  name: string;
  email: string;
  status: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = []
const ELEMENT_DATA2: PeriodicElement2[] = []

@Component({
  selector: 'app-manage-practice',
  templateUrl: './manage-practice.component.html',
  styleUrl: './manage-practice.component.scss'
})
export class ManagePracticeComponent {
  displayedColumns: string[] = ['name', 'email', 'status', 'assignAs', 'action'];
  displayedColumns2: string[] = ['name', 'email', 'status', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource2 = new MatTableDataSource(ELEMENT_DATA2);

  practiceLocations: any = practiceLocations

  orderBy: any = { createdAt: -1 }
  whereCond: any = {}
  totalCount = 0
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  validationMessages = validationMessages;
  userList: any
  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, private authService: AuthService, public commonService: CommonService,) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.whereCond = { role: 'therapist' }
    this.getUserList()
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  changeUser(event: any) {
    this.pageIndex = 0
    if (event.index == 0) {
      this.whereCond = { role: 'therapist' }
    } else {
      this.whereCond = { role: 'support_team' }
    }
    this.getUserList()
  }

  searchRecords(event: any) {
    if (event.target.value != 'All') {
      Object.assign(this.whereCond, { practiceLocation: { $in: event.target.value } })
    } else {
      Object.assign(this.whereCond, { practiceLocation: { $ne: event.target.value } })
    }
    this.getUserList()
  }

  async getUserList() {
    let reqVars = {
      query: this.whereCond,
      fields: { firstName: 1, lastName: 1, email: 1, status: 1, siteLeaderForPracLocation: 1 },
      order: this.orderBy,
      limit: this.pageSize,
      offset: (this.pageIndex * this.pageSize)
    }
    await this.authService.apiRequest('post', 'admin/getUserList', reqVars).subscribe(async response => {
      this.totalCount = response.data.totalCount
      let finalData: any = []
      await response.data.userList.map((element: any) => {
        let newColumns = {
          id: element._id,
          email: element.email,
          status: element.status,
          statusClass: element.status.toLowerCase(),
          siteLeaderForPracLocation: element.siteLeaderForPracLocation,
          name: element.firstName + " " + element.lastName
        }
        finalData.push(newColumns)
      })
      this.userList = new MatTableDataSource(finalData)
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getUserList()
  }

  async assignAsFun(event: any, userObj: any) {
    if (event.target.value != "") {
      let reqVars = {
        query: { _id: userObj.id },
        updateInfo: {
          siteLeaderForPracLocation: event.target.value,
        }
      }
      await this.authService.apiRequest('post', 'admin/updateUser', reqVars).subscribe(async response => {
        this.commonService.openSnackBar(response.message, "SUCCESS")
        this.getUserList()
        let reqVarsEmail = {
          query: { "code": "assignedAsSiteLeader" },
          toEmail: userObj.email,
          params: {
            "{firstName}": userObj.name,
            "{assignedAs}": event.target.value
          }
        }
        this.authService.apiRequest('post', 'email/emailSend', reqVarsEmail).subscribe(async response => {
        })
      })
    }
  }

}
