import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;   
  idpolicy: string;   
  group: string;   
  validThrough: string;   
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    name: 'United Healthcare',   
    idpolicy: '115423658500',
    group: '154236',
    validThrough: '02/11/2027',
    action : ''
  },  
  { 
    name: 'Sigma ',   
    idpolicy: '115423658500',
    group: '154236',
    validThrough: '02/11/2027',
    action : ''
  }, 
  { 
    name: 'Health-choice Healthcare',   
    idpolicy: '115423658500',
    group: '154236',
    validThrough: '02/11/2027',
    action : ''
  },
   
];

@Component({
  selector: 'app-insurance-listing', 
  templateUrl: './insurance-listing.component.html',
  styleUrl: './insurance-listing.component.scss'
})
export class InsuranceListingComponent {

  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog) {}

  displayedColumns: string[] = ['name','idpolicy','group','validThrough', 'action'];
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
