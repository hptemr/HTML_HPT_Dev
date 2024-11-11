 


 

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
    quarterlypatientsseen: 'QUARTERLY AQUATIC 2023 ', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  }, 
  { 
    quarterlypatientsseen: 'TOTAL AQUATIC HAMILTON', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL AQUATIC STEVENSVILLE', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL AQUATIC FRENCHTOWN', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL AQUATIC CORVALLIS ', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL AQUATIC CANYONS', 
    firstq: '3311', 
    secondq:'5974', 
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979', 
  },
  { 
    quarterlypatientsseen: 'TOTAL AQUATIC HNBC', 
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
    qpatients: 'TOTAL PATIENTS SEEN HPT', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },   
  { 
    qpatients: 'QUARTERLY AQUATIC 2022', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'TOTAL AQUATIC HPT', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'TOTAL AQUATIC STEVENSVILLE', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  }, 
  { 
    qpatients: 'TOTAL AQUATIC FRENCHTOWN', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'TOTAL AQUATIC CORVALLIS ', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'TOTAL AQUATIC CANYONS', 
    qfirst: '3748', 
    qsecond:'3632', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'TOTAL AQUATIC HNBC', 
    qfirst: '-', 
    qsecond:'-', 
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351', 
  },
  { 
    qpatients: 'ALL CLINIC TOTAL', 
    qfirst: '1150 ', 
    qsecond:'1142', 
    qthird: '1312',
    qfourth: '975',
    qtotal: '4579', 
  },
];

@Component({
  selector: 'app-quarterly-aquatic', 
  templateUrl: './quarterly-aquatic.component.html',
  styleUrl: './quarterly-aquatic.component.scss'
})

export class QuarterlyAquaticComponent {
  displayedColumns: string[] = [ 'quarterlypatientsseen', 'firstq','secondq','thirdq','fourthq','totalq'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  displayedColumns2: string[] = [ 'qpatients', 'qfirst','qsecond','qthird','qfourth','qtotal',];
  dataSource2 = new MatTableDataSource(ELEMENT_DATA_2);

  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
}
