import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CaseNoteModalComponent } from '../../../support-billing-therapist/notes/case-note-modal/case-note-modal.component';
import { AddFolderModalComponent } from '../../add-folder-modal/add-folder-modal.component';
import { UploadDocumentsModalComponent } from '../../upload-documents-modal/upload-documents-modal.component';


export interface PeriodicElement {
  name: string;   
  actions: string;
  icon : string;
  color:string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { 
    name: 'Patient Benefits Notification Forms',  
    actions: '' ,
    icon: 'folder',
    color: 'folder'  
  }, 
  { 
    name: 'Returned Plans of Care',  
    actions: '',
    icon: 'folder',
    color: 'folder'    
  }, 
  { 
    name: '19G NOTE VERBIAGE',  
    actions: '' ,
    icon: 'description',
    color: 'description'   
  }, 
  { 
    name: 'ADDING PROVIDER STEPS',
    actions: '' ,
    icon: 'description',
    color: 'description'      
  },   
  { 
    name: 'CST FAXES',
    actions: '' ,
    icon: 'description',
    color: 'description'      
  },
  { 
    name: 'EXT LIST',
    actions: '' ,
    icon: 'description',
    color: 'description'    
  },
  { 
    name: 'MEDICAID PPA Instuctions',  
    actions: '' ,
    icon: 'description',
    color: 'description'    
  }, 
  { 
    name: 'NRO POC Track Sheet',  
    actions: '' ,
    icon: 'description',
    color: 'description'      
  },  
];

@Component({
  selector: 'app-system-documents-detailed',
  templateUrl: './system-documents-detailed.component.html',
  styleUrl: './system-documents-detailed.component.scss'
})
export class SystemDocumentsDetailedComponent {
  displayedColumns: string[] = ['name',  'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  addFolderModal() {
    const dialogRef = this.dialog.open(AddFolderModalComponent,{
      panelClass: [ 'custom-alert-container','modal--wrapper'],
    });
  }
  addDocumentsModal() {
    const dialogRef = this.dialog.open(UploadDocumentsModalComponent,{
      panelClass: [ 'custom-alert-container','modal--wrapper'],
    });
  }
  
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
