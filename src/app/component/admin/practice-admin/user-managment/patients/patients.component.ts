 

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvitePopupComponent } from '../../invite-popup/invite-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface PeriodicElement {
  name: string; 
  email: string;
  appointmentDate: string;  
  action: string;  
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    name: 'Jane Cooper', 
    email: 'jane@gmail.com', 
    appointmentDate: 'Sat, Nov 10, 2023 10:00 am', 
    action : ''
  },  
  { 
    name: 'Adam Spear', 
    email: 'adamspear@gmail.com', 
    appointmentDate: 'Fri, Nov 09, 2023 10:00 am', 
    action : ''
  },
  { 
    name: 'Harry Wood', 
    email: 'wood_harry@gmail.com', 
    appointmentDate: 'Wed, Nov 07, 2023 10:30 am', 
    action : ''
  },
  { 
    name: 'Toby Malfoy', 
    email: 'toby1991@gmail.com', 
    appointmentDate: 'Tue, Nov 06, 2023 11:00 am', 
    action : ''
  },
  { 
    name: 'Alan Alsop', 
    email: 'alanalsop@gmail.com', 
    appointmentDate: 'Mon, Nov 05, 2023 10:00 am', 
    action : ''
  },
  { 
    name: 'Bessie Cooper', 
    email: 'bessiecooper@gmail.com', 
    appointmentDate: 'Sat, Nov 03, 2023 09:00 am', 
    action : ''
  }, 
];

@Component({
  selector: 'app-patients', 
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent {
  displayedColumns: string[] = ['name', 'email', 'appointmentDate', 'action'];
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
