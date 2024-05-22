 


  
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
import { pageSize, pageSizeOptions, practiceLocations, appointmentStatus } from 'src/app/config';

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
  practiceLocations: any = practiceLocations
  appointmentStatus: any = appointmentStatus
  
  constructor(private _liveAnnouncer: LiveAnnouncer,  
    public dialog: MatDialog,    
    private router: Router, 
    public authService:AuthService,
    public commonService:CommonService,
    public adminService:AdminService,  
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

    searchRecords(fromType:string,event: any) {

     if(fromType=='practiceLocations'){
      if (event.target.value != 'All') {
        Object.assign(this.whereCond, { practiceLocations: { $in: event.target.value } })
      } else {
        Object.assign(this.whereCond, { practiceLocation: { $ne: event.target.value } })
      }
     }
     if(fromType=='status'){
      if (event.target.value != 'All') {
        Object.assign(this.whereCond, { status: { $in: event.target.value } })
      } else {
        Object.assign(this.whereCond, { status: { $ne: event.target.value } })
      }
     }
     
      this.getAppointmentList()
    }

    async getAppointmentList(action="") {
      if(action==""){ 
        this.commonService.showLoader() 
      }
      console.log('>>>whereCond>>>>',this.whereCond)
      let reqVars = {
        query: this.whereCond,
        fields: { firstName: 1, lastName: 1, email: 1, status: 1, practiceLocation:1 },
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
             createdAt:element.createdAt,
             appointmentDate:element.updatedAt,           
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
        this.isAppointmentsList = this.totalCount>0?true:false 
      })
    }

    resetFilter(){
      // this.locationSelect.nativeElement.selectedIndex = 0;
      // this.statusSelect.nativeElement.selectedIndex = 0;
      // this.searchAdminUsers.setValue('');
      
      this.totalCount = 0
      this.pageIndex = 0
      this.pageSize = pageSize
      this.pageSizeOptions = pageSizeOptions
      this.searchQuery =""
      this.getAppointmentList("reset")
    }

    handlePageEvent(event: any) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
      this.getAppointmentList()
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) { 
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }
 
    showDayTwo() {
      this.dayTwo = true;
      this.dayOne = false;
    }

  
}
