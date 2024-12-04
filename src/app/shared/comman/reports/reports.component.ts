import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { CommonService } from '../../services/helper/common.service';
import { AuthService } from '../../services/api/auth.service';
import { practiceLocations } from 'src/app/config';

// import {
//   ChartComponent,
//   ApexAxisChartSeries,
//   ApexChart,
//   ApexXAxis,
//   ApexDataLabels,
//   ApexStroke,
//   ApexMarkers,
//   ApexYAxis,
//   ApexGrid,
//   ApexTitleSubtitle,
//   ApexLegend
// } from "ng-apexcharts";

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   stroke: ApexStroke;
//   dataLabels: ApexDataLabels;
//   markers: ApexMarkers;
//   tooltip: any; // ApexTooltip;
//   yaxis: ApexYAxis;
//   grid: ApexGrid;
//   legend: ApexLegend;
//   title: ApexTitleSubtitle;
// };



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
    cx: '130',
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
  }
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
    cx: '130',
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
  }
];

export interface PeriodicElement3 {
  quarterlypatientsseen: string;
  firstq: string;
  secondq: string;
  thirdq: string;
  fourthq: string;
  totalq: string;
}
const ELEMENT_DATA_3: PeriodicElement3[] = [
  {
    quarterlypatientsseen: 'TOTAL PATIENTS SEEN HPT ',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL PATIENTS SEEN STEVENSVILLE ',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL PATIENTS SEEN FRENCHTOWN',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL PATIENTS SEEN CORVALLIS',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL PATIENTS SEEN DARBY',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL PATIENTS SEEN FLORENCE',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL PATIENTS SEEN CANYONS',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL PATIENTS SEEN HNBC',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'ALL CLINIC TOTAL',
    firstq: '13859',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '13859',
  },
];


export interface PeriodicElement4 {
  qpatients: string;
  qfirst: string;
  qsecond: string;
  qthird: string;
  qfourth: string;
  qtotal: string;
}
const ELEMENT_DATA_4: PeriodicElement4[] = [
  {
    qpatients: 'TOTAL PATIENTS SEEN HPT',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL PATIENTS SEEN STEVENSVILLE',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL PATIENTS SEEN FRENCHTOWN',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL PATIENTS SEEN CORVALLIS',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL PATIENTS SEEN DARBY',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL PATIENTS SEEN FLORENCE',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL PATIENTS SEEN CANYONS',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL PATIENTS SEEN HNBC',
    qfirst: '-',
    qsecond: '-',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'ALL CLINIC TOTAL',
    qfirst: '11746',
    qsecond: '12009',
    qthird: '12427',
    qfourth: '13158',
    qtotal: '49340',
  },
];


export interface PeriodicElement5 {
  quarterlypatientsseen: string;
  firstq: string;
  secondq: string;
  thirdq: string;
  fourthq: string;
  totalq: string;
}
const ELEMENT_DATA_5: PeriodicElement5[] = [
  {
    quarterlypatientsseen: 'QUARTERLY AQUATIC 2023 ',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL AQUATIC HAMILTON',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL AQUATIC STEVENSVILLE',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL AQUATIC FRENCHTOWN',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL AQUATIC CORVALLIS ',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL AQUATIC CANYONS',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL AQUATIC HNBC',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'ALL CLINIC TOTAL',
    firstq: '946',
    secondq: '0',
    thirdq: '0',
    fourthq: '0',
    totalq: '1036',
  },
];


export interface PeriodicElement6 {
  qpatients: string;
  qfirst: string;
  qsecond: string;
  qthird: string;
  qfourth: string;
  qtotal: string;
}
const ELEMENT_DATA_6: PeriodicElement6[] = [
  {
    qpatients: 'TOTAL PATIENTS SEEN HPT',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'QUARTERLY AQUATIC 2022',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL AQUATIC HPT',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL AQUATIC STEVENSVILLE',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL AQUATIC FRENCHTOWN',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL AQUATIC CORVALLIS ',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL AQUATIC CANYONS',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL AQUATIC HNBC',
    qfirst: '-',
    qsecond: '-',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'ALL CLINIC TOTAL',
    qfirst: '1150 ',
    qsecond: '1142',
    qthird: '1312',
    qfourth: '975',
    qtotal: '4579',
  },
];


export interface individualTherapistReportPeriodicElement {
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
const individualTherapistReport_ELEMENT_DATA: individualTherapistReportPeriodicElement[] = [
  {
    provider: 'Brady, Thomas',
    month: 'Jan 23',
    totalevals: '10',
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
    month: 'Feb 23',
    totalevals: '10',
    totalcx: '29',
    cxper: '13.01%',
    totalns: '6',
    nsper: '3.00%',
    totalpts2: '200',
    totalbilledunits: '586',
    unitsvisits: '20',
  }

];


export interface individualTherapistReportAnualPeriodicElement {
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
const individualTherapistReportAnual_ELEMENT_DATA: individualTherapistReportAnualPeriodicElement[] = [
  {
    provider: 'Brady, Thomas',
    year: '2023',
    totalevals: '10',
    totalcx: '29',
    cxper: '13.01%',
    totalns: '6',
    nsper: '3.00%',
    totalpts2: '200',
    totalbilledunits: '586',
    unitsvisits: '20',
  }
];

export interface PeriodicElement9 {
  quarterlypatientsseen: string;
  firstq: string;
  secondq: string;
  thirdq: string;
  fourthq: string;
  totalq: string;
}
const ELEMENT_DATA_9: PeriodicElement9[] = [
  {
    quarterlypatientsseen: 'TOTAL EVALS HPT',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL EVALS STEVENSVILLE',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL EVALS FRENCHTOWN',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL EVALS CORVALLIS ',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL EVALS DARBY ',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL EVALS FLORENCE',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL EVALS CANYONS',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'TOTAL EVALS HNBC',
    firstq: '3311',
    secondq: '5974',
    thirdq: '1451',
    fourthq: '0',
    totalq: '9979',
  },
  {
    quarterlypatientsseen: 'ALL CLINIC TOTAL',
    firstq: '946',
    secondq: '0',
    thirdq: '0',
    fourthq: '0',
    totalq: '1036',
  },
];


export interface PeriodicElement10 {
  qpatients: string;
  qfirst: string;
  qsecond: string;
  qthird: string;
  qfourth: string;
  qtotal: string;
}
const ELEMENT_DATA_10: PeriodicElement10[] = [
  {
    qpatients: 'TOTAL EVALS HPT',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL EVALS STEVENSVILLE',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL EVALS FRENCHTOWN',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL EVALS CORVALLIS ',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL EVALS DARBY',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL EVALS FLORENCE',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL EVALS CANYONS',
    qfirst: '3748',
    qsecond: '3632',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'TOTAL EVALS HNBC',
    qfirst: '-',
    qsecond: '-',
    qthird: '3430',
    qfourth: '3541',
    qtotal: '14351',
  },
  {
    qpatients: 'ALL CLINIC TOTAL',
    qfirst: '737 ',
    qsecond: '743',
    qthird: '809',
    qfourth: '857',
    qtotal: '3146',
  },
];


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})

export class ReportsComponent {
  year: any
  years: any = []
  optionType:any='Monthly' //Monthly Values , Quarterly Values
  reportType: any = '';
  selectedLocation: any = '' 

  summaryList: any

  monthlyReport = false;
  quarterlyPatientsSeenReport = false;
  quarterlyAquaticReport = false;
  individualTherapistsReport = false;
  quarterlyEVALSReport = false;

  defaultWarning = true;
  therapistName = false;
  markDefaultReports = false;

  displayedColumnsSummary: string[] = ['month', 'evals', 'cx', 'cxper', 'ns', 'nsper', 'totalpts', 'totalpts2', 'prioryear', 'unitsbilled', 'unitsvist', 'aquatic', 'aquatic2'];


  displayedColumns3: string[] = ['quarterlypatientsseen', 'firstq', 'secondq', 'thirdq', 'fourthq', 'totalq'];
  dataSource3 = new MatTableDataSource(ELEMENT_DATA_3);


  displayedColumns4: string[] = ['qpatients', 'qfirst', 'qsecond', 'qthird', 'qfourth', 'qtotal',];
  dataSource4 = new MatTableDataSource(ELEMENT_DATA_4);

  displayedColumns5: string[] = ['quarterlypatientsseen', 'firstq', 'secondq', 'thirdq', 'fourthq', 'totalq'];
  dataSource5 = new MatTableDataSource(ELEMENT_DATA_5);


  displayedColumns6: string[] = ['qpatients', 'qfirst', 'qsecond', 'qthird', 'qfourth', 'qtotal',];
  dataSource6 = new MatTableDataSource(ELEMENT_DATA_6);

  individualTherapistReportColumns: string[] = ['provider', 'month', 'totalevals', 'totalcx', 'cxper', 'totalns', 'nsper', 'totalpts2', 'totalbilledunits', 'unitsvisits'];
  individualTherapistReportData = new MatTableDataSource(individualTherapistReport_ELEMENT_DATA);


  individualTherapistReportAnualColumns: string[] = ['provider', 'year', 'totalevals', 'totalcx', 'cxper', 'totalns', 'nsper', 'totalpts2', 'totalbilledunits', 'unitsvisits'];
  individualTherapistReportAnualData = new MatTableDataSource(individualTherapistReportAnual_ELEMENT_DATA);

  displayedColumns9: string[] = ['quarterlypatientsseen', 'firstq', 'secondq', 'thirdq', 'fourthq', 'totalq'];
  dataSource9 = new MatTableDataSource(ELEMENT_DATA_9);


  displayedColumns10: string[] = ['qpatients', 'qfirst', 'qsecond', 'qthird', 'qfourth', 'qtotal',];
  dataSource10 = new MatTableDataSource(ELEMENT_DATA_10);


  // @ViewChild("chart") chart: ChartComponent;
  // public chartOptions: Partial<ChartOptions>;

  practiceLocations = practiceLocations

  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog,
    private commonService: CommonService,
    private authService: AuthService,

  ) {
    // this.chartOptions = { 
    //   series: [
    //     {
    //       name: "2023",
    //       data: [45, 52, 38, 24, 33, 26, 21, 20, 60, 18, 40, 100],
    //     },
    //     {
    //       name: "2024",
    //       data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
    //     }, 
    //   ], 
    //   chart: {
    //     height: 400,
    //     type: "line",
    //      fontFamily: 'Nunito Sans', 
    //      toolbar: {
    //       show: false
    //     },
    //     zoom: {
    //       enabled: false,
    //     }
    //   },

    //   dataLabels: {
    //     enabled: false
    //   },
    //   stroke: {
    //     width: 2,
    //     curve: "straight",
    //     dashArray: [0, 8, 5]
    //   },
    //   title: {
    //     text: "Total Patients Seen Comparison",
    //     style: { 
    //       fontWeight: "700",
    //       fontSize: "18px",
    //     }
    //   },
    //   legend: {
    //     tooltipHoverFormatter: function(val:any, opts:any) {
    //       return (
    //         val +
    //         " - <strong>" +
    //         opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
    //         "</strong>"
    //       );
    //     }
    //   },
    //   markers: {
    //     size: 0,
    //     hover: {
    //       sizeOffset: 6
    //     },
    //     colors: ['#000', '#f1f1f1',  ]
    //   },
    //   xaxis: {
    //     labels: {
    //       trim: false
    //     },
    //     categories: [
    //       "Jan",
    //       "Feb",
    //       "Mar",
    //       "Apr",
    //       "May",
    //       "Jun",
    //       "Jul",
    //       "Aug",
    //       "Sep",
    //       "Oct",
    //       "Nov",
    //       "Dec"
    //     ]
    //   },
    //   tooltip: {
    //     y: [
    //       {
    //         title: {
    //           formatter: function(val: string) {
    //             return val + " (mins)";
    //           }
    //         }
    //       },
    //       {
    //         title: {
    //           formatter: function(val: string) {
    //             return val + " per session";
    //           }
    //         }
    //       },
    //       {
    //         title: {
    //           formatter: function(val: any) {
    //             return val;
    //           }
    //         }
    //       }
    //     ]
    //   },
    //   grid: {
    //     borderColor: "#f1f1f1"
    //   }
    // };
  }

  ngOnInit() {
    this.years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
  }


  generateReport() {
    this.defaultWarning = false;
    this.markDefaultReports = true;

    const getval = this.reportType;

    if (getval === 'summary') {
      this.monthlyReport = true;
      this.quarterlyPatientsSeenReport = false;
      this.quarterlyAquaticReport = false;
      this.individualTherapistsReport = false;
      this.quarterlyEVALSReport = false;
      this.therapistName = false;
    }
    else if (getval === 'qpsp') {
      this.quarterlyPatientsSeenReport = true;
      this.monthlyReport = false;
      this.quarterlyAquaticReport = false;
      this.individualTherapistsReport = false;
      this.quarterlyEVALSReport = false;
      this.therapistName = false;
    }
    else if (getval === 'qar') {
      this.quarterlyAquaticReport = true;
      this.monthlyReport = false;
      this.quarterlyPatientsSeenReport = false;
      this.individualTherapistsReport = false;
      this.quarterlyEVALSReport = false;
      this.therapistName = false;
    }
    else if (getval === 'therapistReport') {
      this.individualTherapistsReport = true;
      this.monthlyReport = false;
      this.quarterlyPatientsSeenReport = false;
      this.quarterlyAquaticReport = false;
      this.quarterlyEVALSReport = false;
      this.therapistName = true;
    }
    else if (getval === 'qer') {
      this.quarterlyEVALSReport = true;
      this.monthlyReport = false;
      this.quarterlyPatientsSeenReport = false;
      this.quarterlyAquaticReport = false;
      this.individualTherapistsReport = false;
      this.therapistName = false;
    }
    this.getReports()
  }

  async getReports() {
    this.commonService.showLoader()
    let reqVars = {
      type: this.reportType,
      year: this.year,
      practiceLocation: this.selectedLocation,
      optionType: this.optionType
    }
    await this.authService.apiRequest('post', 'admin/getReports', reqVars).subscribe(async response => {
      this.commonService.hideLoader()
      switch (this.reportType) {
        case "summary":
          this.summaryList = new MatTableDataSource(response.data);
          break;
        case "therapistReport":
          this.individualTherapistReportData = new MatTableDataSource(response.data);  
          break;
      }
    })
  }


  markDefaultReport() {
    const dialogRef = this.dialog.open(AlertComponent, {
      panelClass: 'custom-alert-container',
      data: {
        warningNote: 'Are you sure to mark this report as a default?'
      }
    });
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  summaryIndexChange(event: any) {
    if (event > 0) {
      this.optionType = 'Quarterly'
    } else {
      this.optionType = 'Monthly'
    }
    this.summaryList=[{},{},{},{},{}]
    this.getReports()
  }

  therapistIndexChange (event: any) {
    if(event > 0){
      this.optionType = 'Anually'
    }else{
      this.optionType = 'Monthly'  
    }
    this.getReports()
  } 
}
