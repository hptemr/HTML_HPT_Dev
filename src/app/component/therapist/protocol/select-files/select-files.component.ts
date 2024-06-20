import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  actions: string;
  icon: string;
  color: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    name: '19G NOTE VERBIAGE',  
    actions: '' ,
    icon: 'photo',
    color: 'photo'  
  }, 
  { 
    name: 'ADDING PROVIDER STEPS',  
    actions: '',
    icon: 'description',
    color: 'description'   
  }, 
  { 
    name: 'CST FAXES',  
    icon: 'picture_as_pdf',   
    actions: '',
    color: 'pdf'  
  }, 
  { 
    name: 'EXT LIST',
    icon: 'photo',  
    actions: '',
    color: 'photo'
  },   
  { 
    name: 'MEDICAID PPA Instuctions',
    icon: 'picture_as_pdf',  
    actions: '',
    color: 'pdf'  
  },
  { 
    name: 'NRO POC Track Sheet',
    icon: 'description',  
    actions: '',
    color: 'description'   
  },
  { 
    name: '19G NOTE VERBIAGE',  
    actions: '' ,
    icon: 'photo',
    color: 'photo'  
  }, 
  { 
    name: 'ADDING PROVIDER STEPS',  
    actions: '',
    icon: 'description',
    color: 'description'    
  }, 
  { 
    name: 'CST FAXES',  
    icon: 'picture_as_pdf',   
    actions: '',
    color: 'pdf'   
  }, 
  { 
    name: 'EXT LIST',
    icon: 'description',
    color: 'description',  
    actions: ''   
  },   
  { 
    name: 'MEDICAID PPA Instuctions',
    icon: 'picture_as_pdf',  
    actions: '',
    color: 'pdf'   
  },
  { 
    name: 'NRO POC Track Sheet',
    icon: 'photo',  
    actions: '',
    color:'photo'   
  },
   
];

@Component({
  selector: 'app-select-files', 
  templateUrl: './select-files.component.html',
  styleUrl: './select-files.component.scss'
})
export class SelectFilesComponent {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) { }

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
