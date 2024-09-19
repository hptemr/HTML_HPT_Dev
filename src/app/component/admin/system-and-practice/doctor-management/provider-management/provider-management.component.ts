import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { pageSize, pageSizeOptions, practiceLocations } from 'src/app/config';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ViewProviderDetailsComponent } from '../view-provider-details/view-provider-details.component';

// export interface PeriodicElement {
//   docCredentials: string; 
//   npi: string;
//   docName: string;  
//   createdAt: string;
//   updatedOn: string;
//   action: string; 
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     docName: 'Doc 1 Test',
//     docCredentials:'123',
//     npi: '1888945196',
//     createdAt: '07/22/2024',
//     updatedOn: '07/24/2024',
//     action: '',
//   },
//   {
//     docName: 'Doc 2 Test',
//     docCredentials:'123',
//     npi: '1888945196',
//     createdAt: '07/22/2024',
//     updatedOn: '07/24/2024',
//     action: '',
//   },
//   {
//     docName: 'Doc 3 Test',
//     docCredentials:'123',
//     npi: '1888945196',
//     createdAt: '07/22/2024',
//     updatedOn: '07/24/2024',
//     action: '',
//   },
//   {
//     docName: 'Doc 4 Test',
//     docCredentials:'123',
//     npi: '1888945196',
//     createdAt: '07/22/2024',
//     updatedOn: '07/24/2024',
//     action: '',
//   },
//   {
//     docName: 'Doc 5 Test',
//     docCredentials:'123',
//     npi: '1888945196',
//     createdAt: '07/22/2024',
//     updatedOn: '07/24/2024',
//     action: '',
//   },
//   {
//     docName: 'Doc 6 Test',
//     docCredentials:'123',
//     npi: '1888945196',
//     createdAt: '07/22/2024',
//     updatedOn: '07/24/2024',
//     action: '',
//   },
// ]

export interface ProviderList {
  _id:string; 
  name: string; 
  credentials: string;
  address: string;
  phoneNumber: string;  
  faxNumber: string;
  npi: string; 
  status: string; 
  createdAt: string; 
  updatedAt: string; 
}

const PROVIDER_DATA: ProviderList[] = []

@Component({
  selector: 'app-provider-management',
  templateUrl: './provider-management.component.html',
  styleUrl: './provider-management.component.scss'
})
export class ProviderManagementComponent {
  // displayedColumns: string[] = ['docCredentials', 'docName', 'npi', 'createdAt','updatedOn','action'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  // Table
  displayedColumns: string[] = ['credentials', 'name', 'npi', 'createdAt','updatedAt','action'];
  dataSource = new MatTableDataSource<ProviderList>(PROVIDER_DATA);

  // Provider list variable declaration
  orderBy: any = { createdAt: -1 }
  whereCond: any = {status:'Active'}
  totalCount = 0
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  searchQuery:any =""

  searchProviders = new FormControl('');
  isProviderList:boolean=true

  constructor(
    private _liveAnnouncer: LiveAnnouncer,  
    public dialog: MatDialog,
    public commonService:CommonService,
    public authService:AuthService
  ) {
    this.searchControlProviders()
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.providerList()
  }

  async providerList(action="") {
    if(action==""){ 
      this.commonService.showLoader() 
    }
    Object.assign(this.whereCond, { 
      $or: [
        { name: { $regex: this.searchQuery, $options: 'i' } },
        { npi: { $regex: this.searchQuery, $options: 'i' } },
        // { npi: this.searchQuery }
      ]
    })

    let reqVars = {
      query: this.whereCond,
      fields: { _id:1, name: 1, credentials: 1, address: 1, phoneNumber: 1, faxNumber: 1, npi: 1, status: 1, createdAt: 1, updatedAt: 1 },
      order: this.orderBy,
      limit: this.pageSize,
      offset: (this.pageIndex * this.pageSize)
    }
    await this.authService.apiRequest('post', 'admin/getProviderList', reqVars).subscribe(async response => {
      this.commonService.hideLoader()
      this.totalCount = response.data.totalCount
      let providerDetails: any = []
      await response.data.providerList.map((element: any) => {
        let newColumns = {
          _id: element._id,
          name:  element.name,
          credentials: element.credentials,
          address: element.address,
          phoneNumber: element.phoneNumber,
          faxNumber: element.faxNumber,
          npi: element.npi,
          status: element.status,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt
        }
        providerDetails.push(newColumns)
      })
      this.isProviderList = this.totalCount>0?true:false 
      this.dataSource = new MatTableDataSource<ProviderList>(providerDetails)
    })
  }

  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.providerList()
  }

  searchControlProviders(){
    this.searchProviders.valueChanges
    .pipe(debounceTime(300)) // Debounce for 300ms
    .subscribe(value => {
      // Perform search when value changes
      this.searchProvidersByQuery(value);
    });
  }

  searchProvidersByQuery(searchQuery: any) {
    this.searchQuery = searchQuery
    this.providerList()
  }

  deleteProvider(provider: any){
    const dialogRef = this.dialog.open(AlertComponent, {
      panelClass: 'custom-alert-container',
      data: {
        warningNote: `Are you sure you want to delete ${provider.name} with NPI: ${provider.npi}?`
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if(result && !result.error){
        let reqVars = {
          _id: provider._id
        }
        await this.authService.apiRequest('post', 'admin/deleteProvider', reqVars).subscribe(async res => {
          if(res && !res.error){
            this.providerList()
            this.commonService.openSnackBar(res.message, "SUCCESS")
          }
        },(err)=>{
          err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") :""
        })
        
      }
    });
  }

  viewProviderDetails(providerData:any) {
    const dialogRef = this.dialog.open(ViewProviderDetailsComponent,{
      width:'650px',
      panelClass: [ 'modal--wrapper'],
      data : {
        providerDetails: providerData
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Sortig here
  announceSortChange(sortState: Sort) { 
    let order = 1
    if (sortState.direction == 'desc') {
      order = -1
    } 

    this.orderBy = { [sortState.active]:order }
    this.providerList()
  }

}
