import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

export interface PeriodicElement {
  directory_name: string;   
  actions: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-document-listing', 
  templateUrl: './document-listing.component.html',
  styleUrl: './document-listing.component.scss'
})
export class DocumentListingComponent {
  displayedColumns: string[] = ['directory_name',  'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  searchDirectory = ""
  loading = false
  arrLength = 0
  userType = ""
  pathValues:any = []
  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog,private authService: AuthService,public commonService: CommonService) {
    this.userType = this.authService.getLoggedInInfo('role').replace('_','-')
    this.pathValues.push({link:'/document-listing',name:'Documents'})
    this.getDefaultDirectories()
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  getDefaultDirectories(){
    this.loading =  true
    this.commonService.showLoader()
    var userRole = this.authService.getLoggedInInfo('role')
    var searchParams = { searchValue:this.searchDirectory.trim(), userRole:userRole}
    this.authService.apiRequest('post', 'admin/getDefaultDirectories', searchParams).subscribe(async response => {
      this.loading =  false
      this.commonService.hideLoader()
      var directories = response.data.directoryList
      this.arrLength = directories.length
      this.dataSource.data = directories
      this.dataSource.paginator = this.paginator;
    })
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

  searchRecords(){
    this.getDefaultDirectories()
  }

  gotoDirectory(name:any,id:any){
    this.pathValues.push({link:"/document-details/"+id,name:name})
    localStorage.setItem("pathValues",JSON.stringify(this.pathValues))
  }
}
