 

 
 

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface PeriodicElement {
  name: string;  
  email : string;
  imgPath : string;
  appointmentDate: string;  
  practiceLocation: string;
  therapist : string;
  referredBy : string;
  action: string;   
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    name: 'Darlene Robertson',  
    email: 'drarlenerobertson@gmail.com' ,
    imgPath: 'assets/images/ark/user.png',
    appointmentDate: 'Tue, Nov 13, 2023 02:00 pm', 
    practiceLocation: 'Hamilton PT',
    therapist: 'Linda Thompson',
    referredBy: 'Darwin Robert', 
    action : ''
  }, 
  { 
    name: 'Jacob Jones',  
    email: 'jacobjones@gmail.com' ,
    imgPath: 'assets/images/ark/user-2.png',
    appointmentDate: 'Tue, Dec 01, 2022 03:15 am', 
    practiceLocation: 'Corvallis PT',
    therapist: 'Maria Jones',
    referredBy: 'Siri Jones', 
    action : ''
  } 
   
];

@Component({
  selector: 'app-referrals', 
  templateUrl: './referrals.component.html',
  styleUrl: './referrals.component.scss'
})
export class ReferralsComponent {
  displayedColumns: string[] = ['name','appointmentDate','action'];
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
