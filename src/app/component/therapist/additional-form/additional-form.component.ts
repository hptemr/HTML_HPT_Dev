 

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
    name: 'Patient Enrolment Form ',  
    actions: ''   
  }, 
  { 
    name: 'Incident Report Form 2024',  
    actions: ''   
  }, 
  { 
    name: 'Insurance Information Form',  
    actions: ''   
  }, 
  { 
    name: 'IRA Form',  
    actions: ''   
  },   
  { 
    name: 'Patient Benefits Notification Form 2024',  
    actions: ''   
  },
  { 
    name: 'Employee Orientation Form',  
    actions: ''   
  },
  { 
    name: 'Employee Interview Form Latest',  
    actions: ''   
  } 
   
];

@Component({
  selector: 'app-additional-form', 
  templateUrl: './additional-form.component.html',
  styleUrl: './additional-form.component.scss'
})
export class AdditionalFormComponent {
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
