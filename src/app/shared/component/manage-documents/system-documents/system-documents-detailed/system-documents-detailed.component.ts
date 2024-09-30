import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CaseNoteModalComponent } from '../../../support-billing-therapist/notes/case-note-modal/case-note-modal.component';
import { AddFolderModalComponent } from '../../add-folder-modal/add-folder-modal.component';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { UploadDocumentsModalComponent } from '../../upload-documents-modal/upload-documents-modal.component';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { CommonService } from 'src/app/shared/services/helper/common.service';

export interface PeriodicElement {
  _id:string;
  name: string;   
  actions: string;
  icon : string;
  color:string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-system-documents-detailed',
  templateUrl: './system-documents-detailed.component.html',
  styleUrl: './system-documents-detailed.component.scss'
})
export class SystemDocumentsDetailedComponent {
  displayedColumns: string[] = ['name',  'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  loading = false
  arrLength = 0
  searchItem =  ""
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  listArrayItems:any = []
  dirId:any
  userId = ""
  userType = ""
  pathValues:any = []
  tempPathValues:any = []
  @Output() childEvent = new EventEmitter<string>();
  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog,private authService: AuthService,private route: ActivatedRoute,public commonService: CommonService) {
    this.dirId = this.route.snapshot.paramMap.get('id');
    this.userId = this.authService.getLoggedInInfo("_id")
    this.userType = this.authService.getLoggedInInfo('role').replace('_','-')
    var pathValues = localStorage.getItem("pathValues")
    this.tempPathValues = (pathValues && pathValues!=null)?JSON.parse(pathValues):[]
    this.tempPathValues.forEach((value:any) => {
      this.pathValues.push(value)
    })
    this.getDirectoryItems()
  }

  getDirectoryItems(){
    this.loading =  true
    // this.commonService.showLoader()
    var searchParams = {
      directory: this.dirId,
      searchValue:this.searchItem.trim()
    }
    this.authService.apiRequest('post', 'admin/getDirectoryItems', searchParams).subscribe(async response => {
      // this.commonService.hideLoader()
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
      data: {directory : this.dirId,userId:this.userId}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getDirectoryItems()
      }
    })
  }

  updateModal(element:any,messge:any) {
    var headerName = ""
    var labelName = ""
    if(element.icon=='folder'){
      headerName = 'Update Folder'
      labelName = 'Folder Name'
    }else{
      headerName='Update File'
      labelName = 'File Name'
    }
    var extension = element.name.substring(element.name.lastIndexOf('.') + 1);
    var fileNameWithoutextn = element.name.substring(0, element.name.lastIndexOf('.')) || element.name
    const dialogRef = this.dialog.open(AddFolderModalComponent,{
      panelClass: [ 'custom-alert-container','modal--wrapper'],
      data: {type:'update',headerName : headerName,labelName:labelName,updateValue:fileNameWithoutextn,error:messge}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(element.icon=='folder'){
          var params = { 
            directoryName : result,
            directoryId:element._id
          }
          this.authService.apiRequest('post', 'admin/updateDirectory', params).subscribe(async response => {
            this.getDirectoryItems()
          },(err)=>{
            this.updateModal(element,err.error.message)
          })
        }else{
          var params2 = { 
            oldFileName : element.name,
            newFileName: result+"."+extension,
            itemId:element._id
          }
          this.authService.apiRequest('post', 'admin/updateFile', params2).subscribe(async response => {
            this.getDirectoryItems()
          },(err)=>{
            this.updateModal(element,err.error.message)
          })
        }
      }
    })
  }

  addFolderModal(message:any,result:any) {
    const dialogRef = this.dialog.open(AddFolderModalComponent,{
      panelClass: [ 'custom-alert-container','modal--wrapper'],
      data: {type:'create',headerName : 'Create Folder',labelName:'Folder Name',updateValue:result,error:message}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        var params = { 
          directoryName : result,
          directoryId: this.dirId,
          endUserId:this.userId
        }
        this.authService.apiRequest('post', 'admin/createDirectory', params).subscribe(async response => {
          this.getDirectoryItems()
        },(err)=>{
          this.addFolderModal(err.error.message,result)
        })
      }
    })
  }

  removeItem(element:any){
    var type = ""
    var source = ""
    if(element.icon=='folder'){
      type = 'directory'
      source = 'directory'
    }else{
      type='file'
      source = 'document'
    }
    const dialogRef = this.dialog.open(AlertComponent, {
      panelClass: 'custom-alert-container',
      data: {
        warningNote: 'Do you really want to delete this '+source+'?'
      }
    })
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      } else {
        var params = { 
          sourceType: type,
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

  gotoDirectory(id:any,type:any,folderName:any){
    this.dirId = id
    if(type=='folder'){
      this.pathValues.push({link:"/manage-documents/system-documents/system-documents-detailed/"+id,name:folderName})
      localStorage.setItem("pathValues",JSON.stringify(this.pathValues))
      window.open(`${window.location.origin}`+"/"+`${this.userType}`+"/manage-documents/system-documents/system-documents-detailed/"+id,"_self");
    }
  }

  removeElementsFromIndex(arr:any, startIndex:any) {
    if (startIndex < 0 || startIndex >= arr.length) {
      return arr;
    }
    
    arr.splice(startIndex);
    return arr;
  }

  async backToDirectory(item:any){
    var index = this.pathValues.findIndex((obj:any) => obj.name === item.name);
    this.tempPathValues = await this.removeElementsFromIndex(this.pathValues, index+1);
    localStorage.setItem("pathValues",JSON.stringify(this.tempPathValues))
    window.open(`${window.location.origin}`+"/"+`${this.userType}`+item.link,"_self");
  }

}
