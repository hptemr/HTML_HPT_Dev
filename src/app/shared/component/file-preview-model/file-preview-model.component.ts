import { Component, Inject } from '@angular/core';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-preview',
  templateUrl: './file-preview-model.component.html',
  styleUrl: './file-preview-model.component.scss'
})
export class FilePreviewComponent {
  fileType:string=''
  fileName:string=''
  previewUrl:string=''
  icon:string=''
  constructor(private authService: AuthService,private route: ActivatedRoute,public commonService: CommonService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<FilePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.commonService.showLoader()
    this.previewUrl=data.documentsLink
    this.fileType=data.fileType
    this.fileName=data.fileName
    this.icon=data.icon
  }
  

  getIcon(fileType: any) {

  }


  ngOnInit() {  

  }

  ngAfterViewInit(){
    this.commonService.hideLoader()
  }
}
