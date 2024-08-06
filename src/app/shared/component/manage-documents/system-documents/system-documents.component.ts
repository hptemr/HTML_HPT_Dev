import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/services/api/auth.service';

export interface PeriodicElement {
  directory_name: string;
  actions:string   
}
const ELEMENT_DATA: PeriodicElement[] = [ ];

@Component({
  selector: 'app-system-documents',
  templateUrl: './system-documents.component.html',
  styleUrl: './system-documents.component.scss'
})
export class SystemDocumentsComponent {
  displayedColumns: string[] = ['directory_name',"actions"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  searchDirectory = ""
  loading = false
  arrLength = 0
  userType = ""
  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog,private authService: AuthService) {
    this.userType = this.authService.getLoggedInInfo('role').replace('_','-')
    this.getDefaultDirectories()
  }

  getDefaultDirectories(){
    this.loading =  true
    var userRole = this.authService.getLoggedInInfo('role')
    var searchParams = { searchValue:this.searchDirectory.trim(), userRole:userRole}
    this.authService.apiRequest('post', 'admin/getDefaultDirectories', searchParams).subscribe(async response => {
      this.loading =  false
      var directories = response.data.directoryList
      // if(this.userType=='practice-admin'){
      //   directories = directories.filter((el: { directory_name: string; }) => el.directory_name !== "Additional Documents" );
      // }
      this.arrLength = directories.length
      this.dataSource.data = directories
      this.dataSource.paginator = this.paginator;
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

  searchRecords(){
    this.getDefaultDirectories()
  }
}
