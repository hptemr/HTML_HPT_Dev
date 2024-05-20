 


  
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Component, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
//import { InvitePopupComponent } from '../../invite-popup/invite-popup.component';
//import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { pageSize, pageSizeOptions, practiceLocations } from 'src/app/config';
import { validationMessages } from 'src/app/utils/validation-messages';

export interface PeriodicElement {
  name: string;  
  updatedAt: string;  
  action: string;  
  status: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    name: 'Jane Cooper',   
    updatedAt: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'pending',
    action : ''
  },  
  { 
    name: 'Leslie Alexander',   
    updatedAt: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'completed',
    action : ''
  },
  { 
    name: 'Leslie Alexander',   
    updatedAt: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'declined',
    action : ''
  },
  { 
    name: 'Maria Jones',   
    updatedAt: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'rescheduled',
    action : ''
  }, 
  { 
    name: 'Shirlene Walter',   
    updatedAt: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'deleted',
    action : ''
  },  
  { 
    name: 'Jane Cooper',   
    updatedAt: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'pending',
    action : ''
  },  
  { 
    name: 'Leslie Alexander',   
    updatedAt: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'completed',
    action : ''
  },
  { 
    name: 'Leslie Alexander',   
    updatedAt: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'declined',
    action : ''
  },
  { 
    name: 'Maria Jones',   
    updatedAt: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'rescheduled',
    action : ''
  }, 
  { 
    name: 'Shirlene Walter',   
    updatedAt: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'deleted',
    action : ''
  }, 
];

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
        fields: {},//{ firstName: 1, lastName: 1, email: 1, status: 1, siteLeaderForPracLocation: 1,practiceLocation:1 },
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
             name: "Jane Cooper",//element.firstName + " " + element.lastName
             // email: element.email,
             // statusClass: element.status.toLowerCase(),
             // //siteLeaderForPracLocation: element.siteLeaderForPracLocation,             
          }
          finalData.push(newColumns)
        })
        if(response.data.appointmentList.length>0){
          this.dayTwo = true;
          this.dayOne = false;
          this.appointmentsList = new MatTableDataSource(finalData)
        }
        this.isAppointmentsList = this.totalCount>0?true:false 
        console.log('appointment list >>>>>',this.appointmentsList)
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
