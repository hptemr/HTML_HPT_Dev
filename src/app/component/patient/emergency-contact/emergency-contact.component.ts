 



import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';

export interface PeriodicElement {
  name: string;   
  fname : string;
  relation: string;   
  phoneNumber: string;     
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    fname: 'Joyce ',
    name: 'Chambers',   
    relation: 'Relation 1',
    phoneNumber: '7262335478', 
    action : ''
  },   
  { 
    fname: 'Ellianna  ',
    name: 'Roman',   
    relation: 'Relation 2',
    phoneNumber: '5013605013', 
    action : ''
  },
  { 
    fname: 'Athena',
    name: 'Diaz',   
    relation: 'Relation 3',
    phoneNumber: '9221023256', 
    action : ''
  },
  { 
    fname: 'London  ',
    name: 'Cole',   
    relation: 'Relation 4',
    phoneNumber: '5478965473', 
    action : ''
  },   
  { 
    fname: 'Drew   ',
    name: 'Shelton',   
    relation: 'Relation 5',
    phoneNumber: '9822587458', 
    action : ''
  }, 
   
];

@Component({
  selector: 'app-emergency-contact', 
  templateUrl: './emergency-contact.component.html',
  styleUrl: './emergency-contact.component.scss'
})
export class EmergencyContactComponent {

  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog) {} 
  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote: 'Contact Details have been saved successfully!'
      }
    });
  }
  deleteAccount() {
    const dialogRef = this.dialog.open(AlertComponent,{
      panelClass: 'custom-alert-container',
      data : {
        warningNote: 'Do you really want to delete this contact?'
      }
    });
  }

  displayedColumns: string[] = ['fname', 'name','relation','phoneNumber', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
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
