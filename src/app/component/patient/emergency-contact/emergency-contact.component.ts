import { Component,OnInit,ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from 'src/app/utils/validation-messages';
import { s3Details, pageSize, pageSizeOptions } from 'src/app/config';
export interface PeriodicElement {
  name: string;   
  fname : string;
  relation: string;   
  phoneNumber: string;     
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-emergency-contact', 
  templateUrl: './emergency-contact.component.html',
  styleUrl: './emergency-contact.component.scss'
})
export class EmergencyContactComponent implements OnInit {
  public userId: string;
  public userRole: string;
  emergencyContactList:any=[];
  
  displayedColumns: string[] = ['firstName', 'lastName','relationWithPatient','phoneNumber', 'action'];
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
  validationMessages:any=validationMessages;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private _liveAnnouncer: LiveAnnouncer,public authService:AuthService,public commonService:CommonService,  public dialog: MatDialog) {} 

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id') 
    this.userRole = this.authService.getLoggedInInfo('role')  
    var query = {};
    this.whereCond = Object.assign({ patientId: this.userId }, query);
    this.getEmergencyContactDetail()
  }

  async getEmergencyContactDetail(action=""){
    const req_vars = {
      query: this.whereCond,
      order: this.orderBy,
      limit: this.pageSize,
      offset: (this.pageIndex * this.pageSize)
    }
    if(action==''){
      this.commonService.showLoader();       
    }    
    await this.authService.apiRequest('post', 'emergencyContact/getContactListData', req_vars).subscribe(async response => {         
      this.commonService.hideLoader();
      if (response.error) {
        if(response.message){
          this.commonService.openSnackBar(response.message, "ERROR")   
        }
      } else {       
          this.totalCount = response.data.totalCount 
          if(response && response.data){
            this.emergencyContactList = new MatTableDataSource(response.data.emergencyContactList);
          }
          if (this.totalCount > 0) {
            this.dayTwo = true;
            this.dayOne = false;
          }         
      }      
    })
  }

  searchRecords(event: any) {
    let searchStr = event.target.value.trim()
    if (searchStr != '') {
      searchStr = searchStr.replace("+", "\\+");
      let finalStr = { $regex: searchStr, $options: 'i' }
      Object.assign(this.whereCond, { $or: [{ firstName: finalStr }, { lastName: finalStr }] })
    } else {
      delete this.whereCond['$or'];
    }
    this.getEmergencyContactDetail('search')
  }

  deleteAccount(id:string) {
    const dialogRef = this.dialog.open(AlertComponent,{
      panelClass: 'custom-alert-container',
      data : {
        warningNote: 'Do you really want to delete this contact?'
      }
    })
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }else{
        let query = {}
        const req_vars = {
          query: Object.assign({ _id: id }, query),          
        }
        this.authService.apiRequest('post', 'emergencyContact/deleteContact', req_vars).subscribe(async response => {
          if (response.error) {
            this.commonService.openSnackBar(response.message, "ERROR")           
          } else {          
            this.getEmergencyContactDetail('')
            this.commonService.openSnackBar(response.message, "SUCCESS")
          }
        }, (err) => {
          console.error(err)
        })   
      }
    })
  }

  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getEmergencyContactDetail()
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

    this.getEmergencyContactDetail()
  }
  
}
