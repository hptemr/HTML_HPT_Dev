 


 


import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvitePopupComponent } from '../invite-popup/invite-popup.component';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  name: string; 
  emailId: string; 
  status: string;
  assignAs:string; 
  action: string; 
}
export interface PeriodicElement2 {
  name: string; 
  emailId: string; 
  status: string; 
  action: string; 
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    name: 'Jane Cooper', 
    emailId: 'darlenerobertson@gmail.com',  
    status: 'Active',
    assignAs: '',
    action : ''
  }, 
  { 
    name: 'Floyd Miles', 
    emailId: 'miles@yahoo.com',  
    status: 'Active',
    assignAs: '',
    action : ''
  },
  { 
    name: 'Ronald Richards', 
    emailId: 'richard@gmail.com',  
    status: 'Active',
    assignAs: '',
    action : ''
  },
  { 
    name: 'Marvin McKinney', 
    emailId: 'marvin21@gamil.com',  
    status: 'Active',
    assignAs: '',
    action : ''
  }, 
  { 
    name: 'Jerome Bell', 
    emailId: 'j_bell@gmail.com',  
    status: 'Active',
    assignAs: '',
    action : ''
  },
];

const ELEMENT_DATA2: PeriodicElement2[] = [
  { 
    name: 'Jane Cooper', 
    emailId: 'darlenerobertson@gmail.com',  
    status: 'Active', 
    action : ''
  },  
  { 
    name: 'Floyd Miles', 
    emailId: 'miles@yahoo.com',  
    status: 'Active', 
    action : ''
  },
  { 
    name: 'Ronald Richards', 
    emailId: 'richard@gmail.com',  
    status: 'Active', 
    action : ''
  },
  { 
    name: 'Marvin McKinney', 
    emailId: 'marvin21@gamil.com',  
    status: 'Active', 
    action : ''
  }, 
  { 
    name: 'Jerome Bell', 
    emailId: 'j_bell@gmail.com',  
    status: 'Active', 
    action : ''
  },
];

@Component({
  selector: 'app-manage-practice', 
  templateUrl: './manage-practice.component.html',
  styleUrl: './manage-practice.component.scss'
})
export class ManagePracticeComponent {
  displayedColumns: string[] = ['name', 'emailId',   'status', 'assignAs', 'action'];
  displayedColumns2: string[] = ['name', 'emailId',   'status',  'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource2 = new MatTableDataSource(ELEMENT_DATA2);

  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator;
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

    invitePopup() {
      const dialogRef = this.dialog.open(InvitePopupComponent,{
        panelClass: 'inivite--modal',
        data : {
          heading: 'Add Template'
        }
      });
    }

}
