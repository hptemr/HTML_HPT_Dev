import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;   
  actions: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    name: 'Billing',  
    actions: ''   
  }, 
  { 
    name: 'Css',  
    actions: ''   
  }, 
  { 
    name: 'Cst',  
    actions: ''   
  }, 
  { 
    name: 'Human Resource Director',  
    actions: ''   
  },
  { 
    name: 'Plans of Care',  
    actions: ''   
  }, 
  { 
    name: 'Providers',  
    actions: ''   
  }, 
  { 
    name: 'Site Leaders',  
    actions: ''   
  }, 
  { 
    name: 'Treasurer',  
    actions: ''   
  },   
  { 
    name: 'Additional Documents',  
    actions: ''   
  },
];

@Component({
  selector: 'app-system-documents',
  templateUrl: './system-documents.component.html',
  styleUrl: './system-documents.component.scss'
})
export class SystemDocumentsComponent {
  displayedColumns: string[] = ['name',  'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog) {}

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
}
