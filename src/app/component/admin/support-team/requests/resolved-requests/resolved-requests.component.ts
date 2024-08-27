import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-resolved-requests', 
  templateUrl: './resolved-requests.component.html',
  styleUrl: './resolved-requests.component.scss'
})
export class ResolvedRequestsComponent {
  displayedColumns: string[] = ['name','padt','pl','rb','ro','symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
export interface PeriodicElement {
  name: string;
  padt: string;
  pl: string;
  rb: string;
  ro: string; 
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'Snehal Misalj', 
    padt: 'Tue, Nov 13, 2023 02:00 pm', 
    pl:' Hamilton PT', 
    rb: 'John21', 
    ro:'Tue, Nov 13, 2023 02:00 pm', 
    symbol:'Sat, Nov 10, 2023 '
  },  
  {
    name: 'Leslie Alexander', 
    padt: 'Tue, Nov 13, 2023 02:00 pm', 
    pl:' Hamilton PT', 
    rb: 'John21', 
    ro:'Tue, Nov 13, 2023 02:00 pm', 
    symbol:'Sat, Nov 10, 2023 '
  },  
  {
    name: 'Maria Jones', 
    padt: 'Tue, Nov 13, 2023 02:00 pm', 
    pl:' Hamilton PT', 
    rb: 'John21', 
    ro:'Tue, Nov 13, 2023 02:00 pm', 
    symbol:'Sat, Nov 10, 2023 '
  },  
  {
    name: 'Snehal Misalj', 
    padt: 'Tue, Nov 13, 2023 02:00 pm', 
    pl:' Hamilton PT', 
    rb: 'John21', 
    ro:'Tue, Nov 13, 2023 02:00 pm', 
    symbol:'Sat, Nov 10, 2023 '
  },  
];
