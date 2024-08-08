 

 

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface PeriodicElement {
  name: string;  
  appointmentDate: string;  
  action: string;  
  status: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    name: 'Jane Cooper',   
    appointmentDate: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'completed',
    action : ''
  },  
  { 
    name: 'Leslie Alexander',   
    appointmentDate: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'pending',
    action : ''
  },
  { 
    name: 'Maria Jones',   
    appointmentDate: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'suspended',
    action : ''
  }, 
  { 
    name: 'Shirlene Walter',   
    appointmentDate: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'rejected',
    action : ''
  },  
];

@Component({
  selector: 'app-patient-details', 
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.scss'
})
export class PatientDetailsComponent {
  displayedColumns: string[] = ['name', 'appointmentDate','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  model: NgbDateStruct;

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
