 
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';

export interface PeriodicElement {
  _id:string;
  name: string;   
  actions: string;
  icon : string;
  color:string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-document-detailing', 
  templateUrl: './document-detailing.component.html',
  styleUrl: './document-detailing.component.scss'
})
export class DocumentDetailingComponent {
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
  constructor(private _liveAnnouncer: LiveAnnouncer,  public dialog: MatDialog,private authService: AuthService,private route: ActivatedRoute) {
    this.dirId = this.route.snapshot.paramMap.get('id');
    this.userId = this.authService.getLoggedInInfo("_id")
    this.userType = this.authService.getLoggedInInfo('role').replace('_','-')
    this.getDirectoryItems()
  }

  getDirectoryItems(){
    this.loading =  true
    var searchParams = {
      directory: this.dirId,
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

    previewFile(fileId:any){
      window.open(`${window.location.origin}`+"/"+`${this.userType}`+"/file-preview/"+fileId, '_blank');
    }

    gotoDirectory(id:any,type:any){
      this.dirId = id
      if(type=='folder'){
        window.open(`${window.location.origin}`+"/"+`${this.userType}`+"/document-details/"+id,"_self");
      }
    }

    searchRecords(){
      this.getDirectoryItems()
    }
}
