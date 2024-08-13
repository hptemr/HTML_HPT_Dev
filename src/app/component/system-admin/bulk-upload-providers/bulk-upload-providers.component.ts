import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface PeriodicElement {
  docCredentials: string; 
  npi: string;
  docName: string;
  address: string;  
  phoneNumber: string;
  faxNumber: string; 
  errorText: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    docName: 'Doc 1 Test',
    docCredentials:'123',
    npi: '1888945196',
    phoneNumber: '9933556677',
    faxNumber: '9933556677',
    address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
    errorText: 'No Error',
  },
  {
    docName: 'Doc 2 Test',
    docCredentials:'123',
    npi: '1888945196',
    phoneNumber: '9933556677',
    faxNumber: '9933556677',
    address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
    errorText: 'No Error',
  },
  {
    docName: 'Doc 3 Test',
    docCredentials:'123',
    npi: '1888945196',
    phoneNumber: '9933556677',
    faxNumber: '9933556677',
    address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
    errorText: 'No Error',
  },
  {
    docName: 'Doc 4 Test',
    docCredentials:'123',
    npi: '1888945196',
    phoneNumber: '9933556677',
    faxNumber: '9933556677',
    address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
    errorText: 'No Error',
  },
  {
    docName: 'Doc 5 Test',
    docCredentials:'123',
    npi: '1888945196',
    phoneNumber: '9933556677',
    faxNumber: '9933556677',
    address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
    errorText: 'No Error',
  },
  {
    docName: 'Doc 6 Test',
    docCredentials:'123',
    npi: '1888945196',
    phoneNumber: '9933556677',
    faxNumber: '9933556677',
    address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
    errorText: 'No Error',
  },
]

@Component({
  selector: 'app-bulk-upload-providers',
  templateUrl: './bulk-upload-providers.component.html',
  styleUrl: './bulk-upload-providers.component.scss'
})
export class BulkUploadProvidersComponent {
  displayedColumns: string[] = ['docCredentials', 'docName', 'npi','address', 'phoneNumber','faxNumber','errorText'];
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
