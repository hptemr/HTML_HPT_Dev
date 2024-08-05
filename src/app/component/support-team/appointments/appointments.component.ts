 
 

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
  patientcheckstatus: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    name: 'Corvallis PT',   
    appointmentDate: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'Pending Intake Form',
    patientcheckstatus : '',
    action : ''
  }, 
  { 
    name: 'PT Specialist of Florence',   
    appointmentDate: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'Not Scheduled',
    patientcheckstatus : '',
    action : ''
  },  
  { 
    name: 'Hamilton PT',   
    appointmentDate: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'Scheduled',
    patientcheckstatus : '',
    action : ''
  },  
  { 
    name: 'Stevi PT',   
    appointmentDate: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'Scheduled',
    patientcheckstatus : '',
    action : ''
  }, 
    
  { 
    name: 'Corvallis PT',   
    appointmentDate: 'Sat, Nov 10, 2023 10:00 am', 
    status: 'Pending Intake Form',
    patientcheckstatus : '',
    action : ''
  },  
   
];

@Component({
  selector: 'app-appointments', 
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent {
  displayedColumns: string[] = ['name', 'appointmentDate', 'status','patientcheckstatus','action'];
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
