import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { pageSize, pageSizeOptions } from 'src/app/config';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { ViewInsuDetailsComponent } from '../view-insu-details/view-insu-details.component';

// export interface PeriodicElement {
//   primaryInsuranceName: string; 
//   insuranceType: string;
//   createdAt: string;
//   updatedOn: string;
//   action: string; 
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     primaryInsuranceName: 'Insurance 1',
//     insuranceType:'Medicare',
//     createdAt: '07/22/2024',
//     updatedOn: '07/24/2024',
//     action: '',
//   },
//   {
//     primaryInsuranceName: 'Insurance 2',
//     insuranceType:'Medicaid',
//     createdAt: '07/22/2024',
//     updatedOn: '07/24/2024',
//     action: '',
//   },
//   {
//     primaryInsuranceName: 'Insurance 3',
//     insuranceType:'Tricare',
//     createdAt: '07/22/2024',
//     updatedOn: '07/24/2024',
//     action: '',
//   },
//   {
//     primaryInsuranceName: 'Insurance 4',
//     insuranceType:'CHAMPVA',
//     createdAt: '07/22/2024',
//     updatedOn: '07/24/2024',
//     action: '',
//   },
//   {
//     primaryInsuranceName: 'Insurance 5',
//     insuranceType:'Group Health Plan',
//     createdAt: '07/22/2024',
//     updatedOn: '07/24/2024',
//     action: '',
//   },
//   {
//     primaryInsuranceName: 'Insurance 6',
//     insuranceType:'Other',
//     createdAt: '07/22/2024',
//     updatedOn: '07/24/2024',
//     action: '',
//   },
// ]

export interface InsuranceList {
  _id:string; 
  insuranceName: string; 
  insuranceType: string;
  insuranceAddress: string;
  payerID: string;  
  phoneNumber: string;
  billingType: string; 
  status: string; 
  createdAt: string; 
  updatedAt: string; 
}

const INSURANCE_DATA: InsuranceList[] = []

@Component({
  selector: 'app-manage-insurance',
  templateUrl: './manage-insurance.component.html',
  styleUrl: './manage-insurance.component.scss'
})
export class ManageInsuranceComponent {
  // displayedColumns: string[] = ['primaryInsuranceName','insuranceType','createdAt','updatedOn','action'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['insuranceName','payerID','insuranceType','createdAt','updatedAt','action'];
  dataSource = new MatTableDataSource(INSURANCE_DATA);

  // Provider list variable declaration
  orderBy: any = { createdAt: -1 }
  whereCond: any = {status:'Active'}
  totalCount = 0
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  searchQuery:any =""

  isInsuranceList:boolean=true
  searchInsurance = new FormControl('');

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('statusSelect') statusSelect: ElementRef;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,  
    public dialog: MatDialog,
    public commonService:CommonService,
    public authService:AuthService
  ) {
    this.searchControlInsurance()
  }

  ngOnInit() {
    this.InsuranceList()
  }

  async InsuranceList(action="") {
    if(action==""){ 
      this.commonService.showLoader() 
    }
    Object.assign(this.whereCond, { 
      $or: [
        { insuranceName: { $regex: this.searchQuery, $options: 'i' } },
        { insuranceType: this.searchQuery }
      ]
    })

    let reqVars = {
      query: this.whereCond,
      fields: { _id:1, insuranceName: 1, insuranceType: 1, insuranceAddress: 1, payerID: 1, phoneNumber: 1, billingType: 1, status: 1, createdAt: 1, updatedAt: 1 },
      order: this.orderBy,
      limit: this.pageSize,
      offset: (this.pageIndex * this.pageSize)
    }
    await this.authService.apiRequest('post', 'admin/getUploadInsuranceList', reqVars).subscribe(async response => {
      this.commonService.hideLoader()
      this.totalCount = response.data.totalCount
      let insuranceDetails: any = []
      await response.data.insuranceList.map((element: any) => {
        let newColumns = {
          _id: element._id,
          insuranceName:  element.insuranceName,
          insuranceType: element.insuranceType,
          insuranceAddress: element.insuranceAddress,
          payerID: element.payerID,
          phoneNumber: element.phoneNumber,
          billingType: element.billingType,
          status: element.status,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt
        }
        insuranceDetails.push(newColumns)
      })
      this.isInsuranceList = this.totalCount>0?true:false 
      this.dataSource = new MatTableDataSource<InsuranceList>(insuranceDetails)
    })
  }

  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.InsuranceList()
  }

  searchControlInsurance(){
    this.searchInsurance.valueChanges
    .pipe(debounceTime(300)) // Debounce for 300ms
    .subscribe(value => {
      // Perform search when value changes
      this.searchInsuranceByQuery(value);
    });
  }

  searchInsuranceByQuery(searchQuery: any) {
    this.searchQuery = searchQuery
    this.InsuranceList()
  }

  onStatusChange(event:any){
    let status = event.target.value;
    if(status){
      this.searchQuery = status
      this.InsuranceList()
    }else{
      this.searchQuery =""
      this.InsuranceList()
    }
  }

  deleteInsurance(insurance: any){
    const dialogRef = this.dialog.open(AlertComponent, {
      panelClass: 'custom-alert-container',
      data: {
        warningNote: `Are you sure you want to delete ${insurance.insuranceName} with Payer ID: ${insurance.payerID}?`
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if(result && !result.error){
        let reqVars = {
          _id: insurance._id
        }
        await this.authService.apiRequest('post', 'admin/deleteInsurance', reqVars).subscribe(async res => {
          if(res && !res.error){
            this.InsuranceList()
            this.commonService.openSnackBar(res.message, "SUCCESS")
          }
        },(err)=>{
          err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") :""
        })
        
      }
    });
  }

  viewInsuranceDetails(insuranceData:any) {
    const dialogRef = this.dialog.open(ViewInsuDetailsComponent,{
      width:'650px',
      panelClass: [ 'modal--wrapper'],
      data : {
        insuranceDetails: insuranceData
      }
    });
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) { 
    let order = 1
    if (sortState.direction == 'desc') {
      order = -1
    } 

    this.orderBy = { [sortState.active]:order }
    this.InsuranceList()

    // if (sortState.direction) {
    //   this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    // } else {
    //   this._liveAnnouncer.announce('Sorting cleared');
    // }
  }
}
