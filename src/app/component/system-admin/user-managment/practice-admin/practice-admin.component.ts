import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InvitePopupComponent } from '../../invite-popup/invite-popup.component';

export interface PeriodicElement {
  name: string; 
  email: string;
  practicelocatn: string; 
  status: string;
  action: string;  
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    name: 'Jane Cooper', 
    email: 'jane@gmail.com', 
    practicelocatn: 'Hamilton PT',
    status: 'Active',
    action : ''
  }, 
  { 
    name: 'Floyd Miles', 
    email: 'miles@yahoo.com', 
    practicelocatn: 'Hamilton PT at The Canyons Active',
    status: 'Pending',
    action : ''
  }, 
  { 
    name: 'Ronald Richards', 
    email: 'richard@gmail.com', 
    practicelocatn: 'Hamilton PT',
    status: 'Suspended',
    action : ''
  }, 
  { 
    name: 'Marvin McKinney', 
    email: 'marvin21@gamil.com', 
    practicelocatn: 'Corvallis PT',
    status: 'Deleted',
    action : ''
  },
];

@Component({
  selector: 'app-practice-admin',  
  templateUrl: './practice-admin.component.html',
  styleUrl: './practice-admin.component.scss'
})
export class PracticeAdminComponent {
  displayedColumns: string[] = ['name', 'email', 'practicelocatn', 'status', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router, public dialog: MatDialog) {}

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

    invitePopup() {
      const dialogRef = this.dialog.open(InvitePopupComponent,{
        panelClass: 'inivite--modal',
        data : {
          heading: 'Invite Practice Admin'
        }
      });
    }

}
