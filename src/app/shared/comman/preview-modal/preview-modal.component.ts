import { CommonModule } from '@angular/common';
import { Component,Inject,OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog'; 
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-preview-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './preview-modal.component.html',
  styleUrl: './preview-modal.component.scss'
})
export class PreviewModalComponent {
  fileId:string='';
  fileType:string='';
  fileName:string='';
  previewUrl:string='';
  constructor( private router: Router,public dialog: MatDialog,private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService,private _liveAnnouncer: LiveAnnouncer, public dialogRef: MatDialogRef<PreviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.fileId = data.fileId;    
  } 

  ngOnInit() {
    this.commonService.showLoader()
    var searchParams = { 
      fileId: this.fileId,
    }
  this.authService.apiRequest('post', 'admin/previewDocumentFile', searchParams).subscribe(async response => {
    var extension = response.data.fileName.substring(response.data.fileName.lastIndexOf('.') + 1);
    this.fileName = response.data.fileName;
    if(extension=='png' || extension=='jpg' || extension=='jpeg'){
      this.fileType = "image"
    }else if(extension=='mp4' || extension=='webm'){
      this.fileType = "video"
    }else if(extension=='mpeg' || extension=='mp3'){
      this.fileType = "audio"
    }else{
      this.fileType = "doc"
    }
    this.previewUrl = response.data.previewUrl
    this.commonService.hideLoader()
    })

  }
}
