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
  provider: string; 
  year: string; 
  totalevals: string;
  totalcx: string;
  cxper: string;
  totalns: string;
  nsper: string;
  totalpts2: string;
  totalbilledunits: string;
  unitsvisits: string; 
}
const ELEMENT_DATA_2: PeriodicElement2[] = [
  { 
    provider: 'Brady, Thomas', 
    year: '2023', 
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
    year: '2023', 
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
    year: '2023', 
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
    year: '2023', 
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
    year: '2023', 
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
    year: '2023', 
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
    year: '2023', 
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
    year: '2023', 
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
    year: '2023', 
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
    year: '2023', 
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
    year: '2023', 
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
    year: '2023', 
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

@Component({
  selector: 'app-therapist-report-dashboard', 
  templateUrl: './therapist-report-dashboard.component.html',
  styleUrl: './therapist-report-dashboard.component.scss'
})

export class TherapistReportDashboardComponent {
  displayedColumns: string[] = [ 'provider', 'month','totalevals','totalcx','cxper','totalns','nsper','totalpts2','totalbilledunits','unitsvisits'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  displayedColumns2: string[] = [ 'provider', 'year','totalevals','totalcx','cxper','totalns','nsper','totalpts2','totalbilledunits','unitsvisits'];
  dataSource2 = new MatTableDataSource(ELEMENT_DATA_2);

  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
}
