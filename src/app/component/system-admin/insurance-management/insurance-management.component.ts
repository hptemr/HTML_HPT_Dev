import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ViewInsuDetailsModalComponent } from './view-insu-details-modal/view-insu-details-modal.component';

export interface PeriodicElement {
  primaryInsuranceName: string; 
  payerId: string;
  insuranceType: string;
  createdAt: string;
  updatedOn: string;
  action: string; 
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    primaryInsuranceName: 'Insurance 1',
    payerId: '1234567890',
    insuranceType:'Medicare',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
  {
    primaryInsuranceName: 'Insurance 2',
    payerId: '1234567890',
    insuranceType:'Medicaid',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
  {
    primaryInsuranceName: 'Insurance 3',
    payerId: '1234567890',
    insuranceType:'Tricare',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
  {
    primaryInsuranceName: 'Insurance 4',
    payerId: '1234567890',
    insuranceType:'CHAMPVA',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
  {
    primaryInsuranceName: 'Insurance 5',
    payerId: '1234567890',
    insuranceType:'Group Health Plan',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
  {
    primaryInsuranceName: 'Insurance 6',
    payerId: '1234567890',
    insuranceType:'Other',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
]

@Component({
  selector: 'app-insurance-management',
  templateUrl: './insurance-management.component.html',
  styleUrl: './insurance-management.component.scss'
})
export class InsuranceManagementComponent {
  displayedColumns: string[] = ['primaryInsuranceName','payerId', 'insuranceType','createdAt','updatedOn','action'];
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

  viewInsuDetailsModal(){

  const dialogRef = this.dialog.open(ViewInsuDetailsModalComponent,{
      width:'650px',
      panelClass: [ 'modal--wrapper'],
    });
  }
}
