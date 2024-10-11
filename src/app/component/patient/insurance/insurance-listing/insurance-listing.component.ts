import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { validationMessages } from 'src/app/utils/validation-messages';
import { s3Details, pageSize, pageSizeOptions } from 'src/app/config';
export interface PeriodicElement {
  //name: string;   
  idpolicy: string;   
  group: string;   
  validThrough: string;   
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-insurance-listing', 
  templateUrl: './insurance-listing.component.html',
  styleUrl: './insurance-listing.component.scss'
})
export class InsuranceListingComponent {
  constructor(
    private _liveAnnouncer: LiveAnnouncer,  
    public dialog: MatDialog,    
    private router: Router, 
    public authService:AuthService,
    public commonService:CommonService,
    public adminService:AdminService
  ) {}
  
  displayedColumns: string[] = ['primaryInsuranceCompany','primaryInsuranceIdPolicy','primaryInsuranceGroup','validThrough', 'status'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  orderBy: any = { updatedAt: -1 }
  whereCond: any = {}
  userQuery: any = {}
  dayTwo = false;
  dayOne = true;
  dayOneFlag:boolean = true;
  model: NgbDateStruct;
  totalCount = 0
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  searchQuery:any =""
  insuranceList: any
  seachByName: any = ''
  seachById: any = ''
  userId:string=''
  userRole:string=''
  validationMessages:any=validationMessages;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {      
    this.userId = this.authService.getLoggedInInfo('_id') 
    this.userRole = this.authService.getLoggedInInfo('role')  
    this.whereCond = Object.assign({ patientId: this.userId });
    this.getInsuranceList('')
   }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async getInsuranceList(action="") {
    if(action==""){ 
      this.commonService.showLoader() 
    }

    let reqVars = {
      query: this.whereCond,
      fields: { _id: 1, patientId: 1,   primaryInsuranceCompany: 1, primaryInsuranceIdPolicy:1, primaryInsuranceGroup:1, status: 1, createdAt:1, updatedAt:1},
      patientFields: { firstName: 1, lastName: 1, email: 1, status: 1,profileImage:1, practiceLocation:1 },
      order: this.orderBy,
      limit: this.pageSize,
      offset: (this.pageIndex * this.pageSize)
    }
    await this.authService.apiRequest('post', 'insurance/getInsuranceList', reqVars).subscribe(async response => {
      this.commonService.hideLoader()
      this.totalCount = response.data.totalCount
      let finalData: any = []
      
      if(response.data.insuranceList.length>0){
        await response.data.insuranceList.map((element: any) => {
          let newColumns = {
            id: element._id,
            insuranceName: element.insuranceName,
            primaryInsuranceCompany: element.primaryInsuranceCompany,
            primaryInsuranceIdPolicy: element.primaryInsuranceIdPolicy,
            primaryInsuranceGroup: element.primaryInsuranceGroup,
            primaryInsuranceCustomerServicePh: element.primaryInsuranceCustomerServicePh,
            status: element.status
          }
          finalData.push(newColumns)
        }) 
      }
      
      if (this.totalCount > 0) {
        this.dayTwo = true;
        this.dayOne = false;
      }
      this.insuranceList = new MatTableDataSource(finalData)
    })
  }

  searchRecords(event: any) {
    let searchStr = event.target.value.trim()
    let finalStr = {};
    if (searchStr != '') {
      searchStr = searchStr.replace("+", "\\+");
      finalStr = { $regex: searchStr, $options: 'i' }
      this.whereCond = Object.assign(this.whereCond, { primaryInsuranceCompany: finalStr })      
    } else{
      this.whereCond = Object.assign({ patientId: this.userId });
    }

    this.getInsuranceList('search')
  }
  
  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getInsuranceList()
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    let order
    if (sortState.direction == 'desc') {
      order = -1
    } else {
      order = 1
    }
    this.orderBy = {
      [sortState.active]: order
    }
    this.getInsuranceList()
  }

 
  
}
