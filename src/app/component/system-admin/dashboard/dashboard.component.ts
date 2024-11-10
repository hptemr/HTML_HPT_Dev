import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



export interface PeriodicElement {
  month: string; 
  evals: string; 
  cx: string;
  cxper: string;
  ns: string;
  nsper: string;
  totalpts: string;
  totalpts2: string;
  prioryear: string;
  unitsbilled: string;
  unitsvist: string;
  aquatic: string;
  aquatic2: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    month: 'January', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  }, 
  { 
    month: 'February', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  }, 
  { 
    month: 'March', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  }, 
  { 
    month: 'April', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  }, 
  { 
    month: 'May', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  }, 
  { 
    month: 'June', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  }, 
  { 
    month: 'July', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  }, 
  { 
    month: 'August', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  }, 
  { 
    month: 'September', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  }, 
  { 
    month: 'October', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  }, 
  { 
    month: 'November', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  }, 
  { 
    month: 'December', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  },  
  { 
    month: 'TOTAL', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  },
];


export interface PeriodicElement2 {
  month: string; 
  evals: string; 
  cx: string;
  cxper: string;
  ns: string;
  nsper: string;
  totalpts: string;
  totalpts2: string;
  prioryear: string;
  unitsbilled: string;
  unitsvist: string;
  aquatic: string;
  aquatic2: string;
}
const ELEMENT_DATA_2: PeriodicElement2[] = [
  { 
    month: '1ST QTR', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  }, 
  { 
    month: '2ND QTR', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  }, 
  { 
    month: '3RD QTR', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  }, 
  { 
    month: '4TH QTR', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  }, 
  { 
    month: 'TOTAL', 
    evals: '111', 
    cx:'130', 
    cxper: '13.01%',
    ns: '29',
    nsper: '2.09%',
    totalpts: '999',
    totalpts2: '1218',
    prioryear: '17.98%',
    unitsbilled: '20',
    unitsvist: '20',
    aquatic: '84',
    aquatic2: '103',
  },  
];

@Component({
  selector: 'app-dashboard', 
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  displayedColumns: string[] = [ 'month', 'evals','cx','cxper','ns','nsper','totalpts','totalpts2','prioryear','unitsbilled','unitsvist','aquatic','aquatic2'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  displayedColumns2: string[] = [ 'month', 'evals','cx','cxper','ns','nsper','totalpts','totalpts2','prioryear','unitsbilled','unitsvist','aquatic','aquatic2'];
  dataSource2 = new MatTableDataSource(ELEMENT_DATA_2);

  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
}
