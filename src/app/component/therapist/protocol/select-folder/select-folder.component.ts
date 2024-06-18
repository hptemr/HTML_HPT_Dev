import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;   
  actions: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    name: 'ALLMACHER',  
    actions: ''   
  }, 
  { 
    name: 'AMRINE',  
    actions: ''   
  }, 
  { 
    name: 'APRIL WEINBERGER AND Y. COURCHESNE',  
    actions: ''   
  }, 
  { 
    name: 'BECK',  
    actions: ''   
  },
  {
    name: 'BREWINGTON',
    actions: ''
  },
  {
    name: 'BUCKLEY',
    actions: ''
  },
  {
    name: 'CHANNER',
    actions: ''
  },
  {
    name: 'DOLECKI',
    actions: ''
  },   
  {
    name: 'JACOBSON',
    actions: ''
  },
  {
    name: 'M. WOODS',
    actions: ''
  },
  {
    name: 'Valerie Chvle. ARNP',
    actions: ''
  },
];

@Component({
  selector: 'app-select-folder', 
  templateUrl: './select-folder.component.html',
  styleUrl: './select-folder.component.scss'
})
export class SelectFolderComponent {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) {}

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
