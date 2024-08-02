import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddFolderModalComponent } from '../add-folder-modal/add-folder-modal.component';
import { protocolDirectory } from '../../../../config'
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { UploadDocumentsModalComponent } from '../upload-documents-modal/upload-documents-modal.component';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';

export interface PeriodicElement {
  _id:string;
  name: string;   
  actions: string;
  icon : string;
  color:string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-protocols',
  templateUrl: './protocols.component.html',
  styleUrl: './protocols.component.scss'
})
export class ProtocolsComponent {
  displayedColumns: string[] = ['name',  'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  loading = false
  arrLength = 0
  searchItem =  ""
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  listArrayItems:any = []
  userId = ""
  userType = ""
  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog,private authService: AuthService) {
    this.getDirectoryItems()
    this.userId = this.authService.getLoggedInInfo("_id")
    this.userType = this.authService.getLoggedInInfo('role').replace('_','-')

  }


  getDirectoryItems(){
    this.loading =  true
    var searchParams = { 
      directory: protocolDirectory,
      searchValue:this.searchItem.trim()
    }
    this.authService.apiRequest('post', 'admin/getDirectoryItems', searchParams).subscribe(async response => {
      this.loading =  false
      this.listArrayItems = []
      response.data.directoryList.forEach((value:any) => {
        var tempObj = {_id:value._id,name:value.directory_name,actions:'',icon:'folder',color: 'description'}
        this.listArrayItems.push(tempObj)
      })

      response.data.fileList.forEach((value:any) => {
        var extn = value.file_name.split('.').pop();
        var icon = ""
        var color = ""
        if(extn=='pdf'){
          icon = "picture_as_pdf"
          color = "pdf"
        }else if(extn=='png' || extn=='jpg' || extn=='jpeg'){
          icon = "photo"
          color = "photo"
        }else{
          icon = "description"
          color = "description"
        }
        var tempObj = {_id:value._id,name:value.file_name,actions:'',icon:icon,color: color}
        this.listArrayItems.push(tempObj)
      })
      this.arrLength = this.listArrayItems.length
      this.dataSource.data = this.listArrayItems
      this.dataSource.paginator = this.paginator;
    })
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

    searchRecords(){
      this.getDirectoryItems()
    }

    addDocumentsModal() {
      const dialogRef = this.dialog.open(UploadDocumentsModalComponent,{
        panelClass: ['modal--wrapper'],
        width: '520px',
        data: {directory : protocolDirectory,userId:this.userId}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.getDirectoryItems()
        }
      })
    }

    addFolderModal(element:any) {
      const dialogRef = this.dialog.open(AddFolderModalComponent,{
        panelClass: [ 'custom-alert-container','modal--wrapper'],
        data: {type:'update',headerName : 'Update File',labelName:'File Name',updateValue:element.name}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          var params = { 
            oldFileName : element.name,
            newFileName: result,
            itemId:element._id
          }
          this.authService.apiRequest('post', 'admin/updateFile', params).subscribe(async response => {
            this.getDirectoryItems()
          })
        }
      })
    }

    removeItem(element:any){
      const dialogRef = this.dialog.open(AlertComponent, {
        panelClass: 'custom-alert-container',
        data: {
          warningNote: 'Do you really want to delete this document?'
        }
      })
      dialogRef.afterClosed().subscribe(res => {
        if (!res) {
          return;
        } else {
          var params = { 
            sourceType: 'file',
            removeItemId:element._id
          }
          this.authService.apiRequest('post', 'admin/removeDocument', params).subscribe(async response => {
            this.getDirectoryItems()
          })
        }
      })
    }

    previewFile(fileId:any){
      window.open(`${window.location.origin}`+"/"+`${this.userType}`+"/file-preview/"+fileId, '_blank');
    }
}
