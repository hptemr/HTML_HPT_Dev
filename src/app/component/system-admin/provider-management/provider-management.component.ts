import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ViewDetailsModalComponent } from './view-details-modal/view-details-modal.component';

export interface PeriodicElement {
  docCredentials: string; 
  npi: string;
  docName: string;  
  createdAt: string;
  updatedOn: string;
  action: string; 
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    docName: 'Doc 1 Test',
    docCredentials:'123',
    npi: '1888945196',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
  {
    docName: 'Doc 2 Test',
    docCredentials:'123',
    npi: '1888945196',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
  {
    docName: 'Doc 3 Test',
    docCredentials:'123',
    npi: '1888945196',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
  {
    docName: 'Doc 4 Test',
    docCredentials:'123',
    npi: '1888945196',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
  {
    docName: 'Doc 5 Test',
    docCredentials:'123',
    npi: '1888945196',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
  {
    docName: 'Doc 6 Test',
    docCredentials:'123',
    npi: '1888945196',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
]

@Component({
  selector: 'app-provider-management',
  templateUrl: './provider-management.component.html',
  styleUrl: './provider-management.component.scss'
})
export class ProviderManagementComponent {
  displayedColumns: string[] = ['docCredentials', 'docName', 'npi', 'createdAt','updatedOn','action'];
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
 

  viewDetailsModal() {
    const dialogRef = this.dialog.open(ViewDetailsModalComponent,{
      width:'650px',
      panelClass: [ 'modal--wrapper'],
    });
  }

}
