 


import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string; 
  dateAdded: string; 
  status: string;
  action: string;  
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    name: 'Jane Cooper', 
    dateAdded: '02/12/2023',  
    status: 'Active',
    action : ''
  }, 
  { 
    name: 'Floyd Miles', 
    dateAdded: '10/31/2023',  
    status: 'Pending',
    action : ''
  }, 
  { 
    name: 'Ronald Richards', 
    dateAdded: '10/05/2023',  
    status: 'Suspended',
    action : ''
  }, 
  { 
    name: 'Marvin McKinney', 
    dateAdded: '09/12/2023',  
    status: 'Deleted',
    action : ''
  },
];

@Component({
  selector: 'app-efax', 
  templateUrl: './efax.component.html',
  styleUrl: './efax.component.scss'
})
export class EFaxComponent {
  displayedColumns: string[] = ['name', 'dateAdded',   'status', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
      // This example uses English messages. If your application supports
      // multiple language, you would internationalize these strings.
      // Furthermore, you can customize the message to add additional
      // details about the values being sorted.
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }

}
