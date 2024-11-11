 

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



export interface PeriodicElement {
  quarterlypatientsseen: string; 
  firstq: string; 
  secondq: string;
  thirdq: string;
  fourthq: string;
  totalq: string; 
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    quarterlypatientsseen: 'TOTAL PATIENTS SEEN HPT ', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  }, 
  { 
    quarterlypatientsseen: 'TOTAL PATIENTS SEEN STEVENSVILLE ', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL PATIENTS SEEN FRENCHTOWN', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL PATIENTS SEEN CORVALLIS', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL PATIENTS SEEN DARBY', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL PATIENTS SEEN FLORENCE', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL PATIENTS SEEN CANYONS', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL PATIENTS SEEN HNBC', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  }, 
  { 
    quarterlypatientsseen: 'ALL CLINIC TOTAL', 
    firstq: '13859', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '13859', 
  },
];


export interface PeriodicElement2 {
  qpatients: string; 
  qfirst: string; 
  qsecond: string;
  qthird: string;
  qfourth: string;
  qtotal: string; 
}
const ELEMENT_DATA_2: PeriodicElement2[] = [
  { 
    qpatients: 'TOTAL PATIENTS SEEN HPT', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },   
  { 
    qpatients: 'TOTAL PATIENTS SEEN STEVENSVILLE', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'TOTAL PATIENTS SEEN FRENCHTOWN', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'TOTAL PATIENTS SEEN CORVALLIS', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  }, 
  { 
    qpatients: 'TOTAL PATIENTS SEEN DARBY', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'TOTAL PATIENTS SEEN FLORENCE', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'TOTAL PATIENTS SEEN CANYONS', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'TOTAL PATIENTS SEEN HNBC', 
    qfirst: '-', 
    qsecond:'-', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'ALL CLINIC TOTAL', 
    qfirst: '11746', 
    qsecond:'12009', 
    qthird: '12427',
    qfourth: '13158',
    qtotal: '49340', 
  },
];

@Component({
  selector: 'app-quarterly-patients-dashboard', 
  templateUrl: './quarterly-patients-dashboard.component.html',
  styleUrl: './quarterly-patients-dashboard.component.scss'
})

export class QuarterlyPatientsDashboardComponent {
  displayedColumns: string[] = [ 'quarterlypatientsseen', 'firstq','secondq','thirdq','fourthq','totalq'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  displayedColumns2: string[] = [ 'qpatients', 'qfirst','qsecond','qthird','qfourth','qtotal',];
  dataSource2 = new MatTableDataSource(ELEMENT_DATA_2);

  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
}
