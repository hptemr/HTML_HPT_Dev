import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Component, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { pageSize, pageSizeOptions, practiceLocations } from 'src/app/config';
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
  displayedColumns: string[] = ['name', 'appointmentDate','status','patientcheckstatus','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  orderBy: any = { createdAt: -1 }
  whereCond: any = {}
  dayTwo = false;
  dayOne = true;
  isAppointmentsList:boolean=true
  model: NgbDateStruct;
  totalCount = 0
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  searchQuery:any =""
  appointmentsList: any
  constructor(private _liveAnnouncer: LiveAnnouncer,  
    public dialog: MatDialog,    
    private router: Router, 
    public authService:AuthService,
    public commonService:CommonService,
    public adminService:AdminService,
    private route: ActivatedRoute
  
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getAppointmentList('')
   }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async getAppointmentList(action="") {
    if(action==""){ 
      this.commonService.showLoader() 
    }
    let reqVars = {
      query: this.whereCond,
      fields: { _id: 1, patientId: 1, therapistId: 1, appointmentId: 1, status: 1, createdAt:1, updatedAt:1, practiceLocation:1, appointmentDate:1 },
      patientFields: { firstName: 1, lastName: 1, email: 1, status: 1,profileImage:1, practiceLocation:1 },
      order: this.orderBy,
      limit: this.pageSize,
      offset: (this.pageIndex * this.pageSize)
    }
    await this.authService.apiRequest('post', 'appointment/getAppointmentList', reqVars).subscribe(async response => {
      this.commonService.hideLoader()
      this.totalCount = response.data.totalCount
      let finalData: any = []
      await response.data.appointmentList.map((element: any) => {
        let newColumns = {
           id: element._id,
           appointmentId:element.appointmentId,
           checkIn: element.checkIn,
           createdAt:element.updatedAt,
           appointmentDate:element.appointmentDate,           
           status: element.status,
           statusFlag: element.status.charAt(0).toLowerCase() + element.status.slice(1),
           patientName: element.patientId?.firstName + " " + element.patientId?.lastName,             
           
           // email: element.email,
           // statusClass: element.status.toLowerCase(),
           // //siteLeaderForPracLocation: element.siteLeaderForPracLocation,             
        }
        finalData.push(newColumns)
      })
      if(response.data && response.data.appointmentList && response.data.appointmentList.length>0){
        this.dayTwo = true;
        this.dayOne = false;
        this.appointmentsList = new MatTableDataSource(finalData)
      }
      this.isAppointmentsList = this.totalCount>0?true:false;
    })
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) { 
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  async patientCheckIn(event: any, obj: any) {
    if (event.source._checked!=undefined) {
      let reqVars = {
        query: { _id: obj.id },
        updateInfo: {
          checkIn: event.source._checked,
        }
      }
      await this.authService.apiRequest('post', 'appointment/updatePatientCheckIn', reqVars).subscribe(async response => {
        //this.getAppointmentList()     
      })
    }
  }

  showDayTwo() {
    this.dayTwo = true;
    this.dayOne = false;
  }
 

}
