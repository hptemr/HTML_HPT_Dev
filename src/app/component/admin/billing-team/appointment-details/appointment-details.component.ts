import { Component, ViewChild } from '@angular/core';
import { SystemFollowupModalComponent } from '../system-followup-modal/system-followup-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { s3Details } from 'src/app/config';

export interface PeriodicElement {
  note: string;  
  dateAddedOn: string;   
  noteAddedOn: string;
  status: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    note: 'Case Note',   
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Initial Examination',   
    dateAddedOn: 'Fri, Nov 09, 2023 10:00 am', 
    noteAddedOn: 'Mark Swift',
    status: 'Finalized',
    action : ''
  }, 
  { 
    note: 'Daily Note',   
    dateAddedOn: 'Thu, Nov 08, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Draft',
    action : ''
  },
  { 
    note: 'Case Note',   
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Initial Examination',   
    dateAddedOn: 'Fri, Nov 09, 2023 10:00 am', 
    noteAddedOn: 'Mark Swift',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Daily Note',   
    dateAddedOn: 'Thu, Nov 08, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Draft',
    action : ''
  },
  { 
    note: 'Case Note',   
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Initial Examination',   
    dateAddedOn: 'Fri, Nov 09, 2023 10:00 am', 
    noteAddedOn: 'Mark Swift',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Daily Note',   
    dateAddedOn: 'Thu, Nov 08, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Finalized',
    action : ''
  },
  { 
    note: 'Case Note',   
    dateAddedOn: 'Sat, Nov 10, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Finalized',
    action : ''
  }, 
  { 
    note: 'Initial Examination',   
    dateAddedOn: 'Fri, Nov 09, 2023 10:00 am', 
    noteAddedOn: 'Mark Swift',
    status: 'Draft',
    action : ''
  }, 
  { 
    note: 'Daily Note',   
    dateAddedOn: 'Thu, Nov 08, 2023 10:00 am', 
    noteAddedOn: 'Taylor Stafford',
    status: 'Finalized',
    action : ''
  },
];

@Component({
  selector: 'app-appointment-details', 
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss'
})
export class AppointmentDetailsComponent {
  appointmentId: string='';
  public userId: string;
  public userRole: string;
  statusFlag: string;
  app_data: any = [];
  appointmentData: any = [];
  appointment_flag: boolean = false
  profileImage: string = '';

  displayedColumns: string[] = ['note', ' dateAddedOn', 'noteAddedOn', 'status' ,'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _liveAnnouncer: LiveAnnouncer, 
    public dialog: MatDialog,
    private router: Router, 
    private route: ActivatedRoute, 
    public authService: AuthService, 
    public commonService: CommonService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')
    this.getAppointmentDetails()
  }

  async getAppointmentDetails() {
    if (this.appointmentId) {
      this.commonService.showLoader();
      let reqVars = {
        query: { _id: this.appointmentId },
        fields: {},
        patientFields: { _id: 1, firstName: 1, lastName: 1, profileImage: 1,email:1,phoneNumber:1 },
        therapistFields: { _id: 1, firstName: 1, lastName: 1, profileImage: 1 }
      }

      await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', reqVars).subscribe(async response => {
        this.commonService.hideLoader();
        if (response.data && response.data.appointmentData) {
          this.appointmentData = response.data.appointmentData;
          this.statusFlag = this.appointmentData.status.charAt(0).toLowerCase() + this.appointmentData.status.slice(1)
          this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.appointmentData.patientId.profileImage
          this.appointment_flag = true;
          this.app_data[this.appointmentId] = this.appointmentData;
        }
      })
    }
  }


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

  systemFollowup() {
    const dialogRef = this.dialog.open(SystemFollowupModalComponent,{
      panelClass: 'custom-alert-container', 
    });
  }

  
}
