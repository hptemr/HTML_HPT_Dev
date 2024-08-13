import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface PeriodicElement {
  primaryInsuranceName: string; 
  insuranceType: string;
  payerId: string;
  address: string;  
  phoneNumber: string;
  billingType: string; 
  errorText: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    primaryInsuranceName: 'Insurance 1',
    insuranceType:'Medicare',
    payerId: '1888945196',
    phoneNumber: '9933556677',
    billingType: 'AMA',
    address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
    errorText: 'No Error',
  },
  {
    primaryInsuranceName: 'Insurance 2',
    insuranceType:'Medicaid',
    payerId: '1888945197',
    phoneNumber: '9933556677',
    billingType: 'CMS',
    address: '675 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
    errorText: 'No Error',
  },
  {
    primaryInsuranceName: 'Insurance 3',
    insuranceType:'Tricare',
    payerId: '1888945198',
    phoneNumber: '9933556677',
    billingType: 'AMA',
    address: '676 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
    errorText: 'No Error',
  },
  {
    primaryInsuranceName: 'Insurance 4',
    insuranceType:'CHAMPVA',
    payerId: '1888945199',
    phoneNumber: '9933556677',
    billingType: 'CMS',
    address: '677 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
    errorText: 'No Error',
  },
  {
    primaryInsuranceName: 'Insurance 5',
    insuranceType:'Group Health Plan',
    payerId: '1888945200',
    phoneNumber: '9933556677',
    billingType: 'AMA',
    address: '676 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
    errorText: 'No Error',
  },
  {
    primaryInsuranceName: 'Insurance 6',
    insuranceType:'Other',
    payerId: '1888945201',
    phoneNumber: '9933556677',
    billingType: 'CMS',
    address: '677 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
    errorText: 'No Error',
  },
]

@Component({
  selector: 'app-upload-insurances',
  templateUrl: './upload-insurances.component.html',
  styleUrl: './upload-insurances.component.scss'
})
export class UploadInsurancesComponent {
  displayedColumns: string[] = ['primaryInsuranceName', 'insuranceType', 'payerId','address', 'phoneNumber','billingType','errorText'];
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
