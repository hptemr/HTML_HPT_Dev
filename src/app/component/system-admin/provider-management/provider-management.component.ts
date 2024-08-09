import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface PeriodicElement {
  username: string; 
  npi: string;
  status: string;  
  createdAt: string;
  state: string; 
  city: string;
  office_fax: string;  
  office_phone: string;
  action: string;  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    username: 'Doc 1 Test',
    npi: '1888945196',
    status: 'Active',
    createdAt: '07/22/2024',
    state: 'California',
    city: 'Fresno',
    office_fax: '(559) 558 8183',
    office_phone: '(559) 746 9605',
    action: ''
  },
  {
    username: 'Doc 2 Test',
    npi: '1797775531',
    status: 'Active',
    createdAt: '07/22/2024',
    state: 'California',
    city: 'San Francisco',
    office_fax: '(415) 751 1414',
    office_phone: '(415) 751 4914',
    action: ''
  },
  {
    username: 'Doc 3 Test',
    npi: '1187688155',
    status: 'Active',
    createdAt: '07/22/2024',
    state: 'California',
    city: 'Oakland',
    office_fax: '(510) 832 6061',
    office_phone: '(510) 465 5523',
    action: ''
  },
  {
    username: 'Doc 4 Test',
    npi: '1888945196',
    status: 'Active',
    createdAt: '07/22/2024',
    state: 'California',
    city: 'Fresno',
    office_fax: '(559) 558 8183',
    office_phone: '(559) 746 9605',
    action: ''
  },
  {
    username: 'Doc 5 Test',
    npi: '1797775531',
    status: 'Active',
    createdAt: '07/22/2024',
    state: 'California',
    city: 'San Francisco',
    office_fax: '(415) 751 1414',
    office_phone: '(415) 751 4914',
    action: ''
  },
  {
    username: 'Doc 6 Test',
    npi: '1187688155',
    status: 'Active',
    createdAt: '07/22/2024',
    state: 'California',
    city: 'Oakland',
    office_fax: '(510) 832 6061',
    office_phone: '(510) 465 5523',
    action: ''
  },
]

@Component({
  selector: 'app-provider-management',
  templateUrl: './provider-management.component.html',
  styleUrl: './provider-management.component.scss'
})
export class ProviderManagementComponent {
  displayedColumns: string[] = ['username', 'npi', 'status', 'createdAt','state','city','office_fax','office_phone','action'];
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
