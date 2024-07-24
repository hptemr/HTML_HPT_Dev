import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  name: string;   
  actions: string;
  icon : string;
  color:string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    name: 'ACL Hamstring Graft Post Op Protocol',  
    actions: '' ,
    icon: 'description',
    color: 'description'  
  }, 
  { 
    name: 'ACL reconstrucion',  
    actions: '',
    icon: 'picture_as_pdf',
    color: 'pdf'    
  }, 
  { 
    name: 'APRIL WEINBERGER AND Y. COURCHESNE',  
    icon: 'photo',   
    actions: '',
    color: 'photo'   
  }, 
  { 
    name: 'Acromioclavicular (AC) Joint Reconstruction',
    icon: 'picture_as_pdf',  
    actions: '',
    color: 'pdf'   
  },   
  { 
    name: 'Anterior Capsule and Labral Repair (ACL Repair)',
    icon: 'description',  
    actions: '',
    color: 'description'   
  },
  { 
    name: 'Anterior Reconstruction, SLAP Repair',
    icon: 'photo',  
    actions: '',
    color: 'photo'   
  },
  { 
    name: 'Medial Patella Ligament Reconstruction',  
    actions: '' ,
    icon: 'description',
    color: 'description'  
  }, 
  { 
    name: 'BILLING - AMA vs CMS Minute Rules',  
    actions: '',
    icon: 'picture_as_pdf',
    color: 'pdf'    
  },  
];

@Component({
  selector: 'app-appointment-documents',
  templateUrl: './appointment-documents.component.html',
  styleUrl: './appointment-documents.component.scss'
})
export class AppointmentDocumentsComponent {
  displayedColumns: string[] = ['name',  'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog) {}

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
