import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



export interface PeriodicElement {
  provider: string; 
  month: string; 
  totalevals: string;
  totalcx: string;
  cxper: string;
  totalns: string;
  nsper: string;
  totalpts2: string;
  totalbilledunits: string;
  unitsvisits: string; 
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    provider: 'Brady, Thomas', 
    month: 'Jan 23', 
    totalevals:'10', 
    totalcx: '29',
    cxper: '13.01%',
    totalns: '6',
    nsper: '3.00%',
    totalpts2: '200',
    totalbilledunits: '586',
    unitsvisits: '20', 
  },  
  { 
    provider: 'Brooker, Ben', 
    month: 'Jan 23', 
    totalevals:'10', 
    totalcx: '29',
    cxper: '13.01%',
    totalns: '6',
    nsper: '3.00%',
    totalpts2: '200',
    totalbilledunits: '586',
    unitsvisits: '20', 
  },
  { 
    provider: 'Martin, Doug', 
    month: 'Jan 23', 
    totalevals:'10', 
    totalcx: '29',
    cxper: '13.01%',
    totalns: '6',
    nsper: '3.00%',
    totalpts2: '200',
    totalbilledunits: '586',
    unitsvisits: '20', 
  },
  { 
    provider: 'Nohren, Chase', 
    month: 'Jan 23', 
    totalevals:'10', 
    totalcx: '29',
    cxper: '13.01%',
    totalns: '6',
    nsper: '3.00%',
    totalpts2: '200',
    totalbilledunits: '586',
    unitsvisits: '20', 
  }, 
  { 
    provider: 'Palacio, Ashley', 
    month: 'Jan 23', 
    totalevals:'10', 
    totalcx: '29',
    cxper: '13.01%',
    totalns: '6',
    nsper: '3.00%',
    totalpts2: '200',
    totalbilledunits: '586',
    unitsvisits: '20', 
  },
  { 
    provider: 'Stroppel, Sheri', 
    month: 'Jan 23', 
    totalevals:'10', 
    totalcx: '29',
    cxper: '13.01%',
    totalns: '6',
    nsper: '3.00%',
    totalpts2: '200',
    totalbilledunits: '586',
    unitsvisits: '20', 
  },
  { 
    provider: 'Brady, Thomas', 
    month: 'Jan 23', 
    totalevals:'10', 
    totalcx: '29',
    cxper: '13.01%',
    totalns: '6',
    nsper: '3.00%',
    totalpts2: '200',
    totalbilledunits: '586',
    unitsvisits: '20', 
  },  
  { 
    provider: 'Brooker, Ben', 
    month: 'Jan 23', 
    totalevals:'10', 
    totalcx: '29',
    cxper: '13.01%',
    totalns: '6',
    nsper: '3.00%',
    totalpts2: '200',
    totalbilledunits: '586',
    unitsvisits: '20', 
  },
  { 
    provider: 'Martin, Doug', 
    month: 'Jan 23', 
    totalevals:'10', 
    totalcx: '29',
    cxper: '13.01%',
    totalns: '6',
    nsper: '3.00%',
    totalpts2: '200',
    totalbilledunits: '586',
    unitsvisits: '20', 
  },
  { 
    provider: 'Nohren, Chase', 
    month: 'Jan 23', 
    totalevals:'10', 
    totalcx: '29',
    cxper: '13.01%',
    totalns: '6',
    nsper: '3.00%',
    totalpts2: '200',
    totalbilledunits: '586',
    unitsvisits: '20', 
  }, 
  { 
    provider: 'Palacio, Ashley', 
    month: 'Jan 23', 
    totalevals:'10', 
    totalcx: '29',
    cxper: '13.01%',
    totalns: '6',
    nsper: '3.00%',
    totalpts2: '200',
    totalbilledunits: '586',
    unitsvisits: '20', 
  },
  { 
    provider: 'Stroppel, Sheri', 
    month: 'Jan 23', 
    totalevals:'10', 
    totalcx: '29',
    cxper: '13.01%',
    totalns: '6',
    nsper: '3.00%',
    totalpts2: '200',
    totalbilledunits: '586',
    unitsvisits: '20', 
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
  selector: 'app-therapist-report-dashboard', 
  templateUrl: './therapist-report-dashboard.component.html',
  styleUrl: './therapist-report-dashboard.component.scss'
})

export class TherapistReportDashboardComponent {
  displayedColumns: string[] = [ 'provider', 'month','totalevals','totalcx','cxper','totalns','nsper','totalpts2','totalbilledunits','unitsvisits'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  displayedColumns2: string[] = [ 'month', 'evals','cx','cxper','ns','nsper','totalpts','totalpts2','prioryear','unitsbilled','unitsvist','aquatic','aquatic2'];
  dataSource2 = new MatTableDataSource(ELEMENT_DATA_2);

  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
}
