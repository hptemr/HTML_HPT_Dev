  

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
    quarterlypatientsseen: 'TOTAL EVALS HPT', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  }, 
  { 
    quarterlypatientsseen: 'TOTAL EVALS STEVENSVILLE', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL EVALS FRENCHTOWN', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL EVALS CORVALLIS ', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL EVALS DARBY ', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL EVALS FLORENCE', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL EVALS CANYONS', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL EVALS HNBC', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'ALL CLINIC TOTAL', 
    firstq: '946', 
    secondq:'0', 
    thirdq: '0',
    fourthq: '0',
    totalq: '1036', 
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
    qpatients: 'TOTAL EVALS HPT', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },   
  { 
    qpatients: 'TOTAL EVALS STEVENSVILLE', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'TOTAL EVALS FRENCHTOWN', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'TOTAL EVALS CORVALLIS ', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  }, 
  { 
    qpatients: 'TOTAL EVALS DARBY', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'TOTAL EVALS FLORENCE', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'TOTAL EVALS CANYONS', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'TOTAL EVALS HNBC', 
    qfirst: '-', 
    qsecond:'-', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'ALL CLINIC TOTAL', 
    qfirst: '737 ', 
    qsecond:'743', 
    qthird: '809',
    qfourth: '857',
    qtotal: '3146', 
  },
];

@Component({
  selector: 'app-quarterly-evals', 
  templateUrl: './quarterly-evals.component.html',
  styleUrl: './quarterly-evals.component.scss'
})

export class QuarterlyEvalsComponent {
  displayedColumns: string[] = [ 'quarterlypatientsseen', 'firstq','secondq','thirdq','fourthq','totalq'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  displayedColumns2: string[] = [ 'qpatients', 'qfirst','qsecond','qthird','qfourth','qtotal',];
  dataSource2 = new MatTableDataSource(ELEMENT_DATA_2);

  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
}
