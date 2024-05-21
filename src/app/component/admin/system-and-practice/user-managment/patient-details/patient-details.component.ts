



import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvitePopupComponent } from '../../invite-popup/invite-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/helper/common.service';

export interface PeriodicElement {
  name: string;
  appointmentDate: string;
  action: string;
  status: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'Jane Cooper',
    appointmentDate: 'Sat, Nov 10, 2023 10:00 am',
    status: 'Completed',
    action: ''
  },
  {
    name: 'Leslie Alexander',
    appointmentDate: 'Sat, Nov 10, 2023 10:00 am',
    status: 'Completed',
    action: ''
  },
  {
    name: 'Maria Jones',
    appointmentDate: 'Sat, Nov 10, 2023 10:00 am',
    status: 'Completed',
    action: ''
  },
  {
    name: 'Shirlene Walter',
    appointmentDate: 'Sat, Nov 10, 2023 10:00 am',
    status: 'Completed',
    action: ''
  },
];

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.scss'
})
export class PatientDetailsComponent {
  displayedColumns: string[] = ['name', 'appointmentDate', 'status', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  userId:any
  model: NgbDateStruct;

  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, 
    private commonService: CommonService, private router: Router, private route: ActivatedRoute,) { 
    this.route.params.subscribe((params: Params) => {
      this.userId = params['userId']
    })
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  navigateToAdminUserDetails() {
    this.router.navigate([this.commonService.getLoggedInRoute() + '/patients/patient-profile/' + this.userId]);
  }
}
