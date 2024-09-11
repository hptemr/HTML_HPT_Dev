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
  createdAt: string;
  updatedOn: string;
  action: string; 
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    primaryInsuranceName: 'Insurance 1',
    insuranceType:'Medicare',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
  {
    primaryInsuranceName: 'Insurance 2',
    insuranceType:'Medicaid',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
  {
    primaryInsuranceName: 'Insurance 3',
    insuranceType:'Tricare',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
  {
    primaryInsuranceName: 'Insurance 4',
    insuranceType:'CHAMPVA',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
  {
    primaryInsuranceName: 'Insurance 5',
    insuranceType:'Group Health Plan',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
  {
    primaryInsuranceName: 'Insurance 6',
    insuranceType:'Other',
    createdAt: '07/22/2024',
    updatedOn: '07/24/2024',
    action: '',
  },
]

@Component({
  selector: 'app-manage-insurance',
  templateUrl: './manage-insurance.component.html',
  styleUrl: './manage-insurance.component.scss'
})
export class ManageInsuranceComponent {
  displayedColumns: string[] = ['primaryInsuranceName','insuranceType','createdAt','updatedOn','action'];
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
