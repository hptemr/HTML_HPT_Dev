import { Component, ViewChild } from '@angular/core';
import { protocolDirectory } from '../../../../config'
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent {
  previewUrl =  ""
  fileId:any
  fileType = ""
  constructor(private authService: AuthService,private route: ActivatedRoute,public commonService: CommonService) {
    this.commonService.showLoader()
    this.fileId = this.route.snapshot.paramMap.get('file');
    var searchParams = { 
      fileId: this.fileId,
    }
    this.authService.apiRequest('post', 'admin/previewDocumentFile', searchParams).subscribe(async response => {
    var extension = response.data.fileName.substring(response.data.fileName.lastIndexOf('.') + 1);
    console.log("prev doc",extension)
    if(extension=='png' || extension=='jpg' || extension=='jpeg'){
      this.fileType = "image"
    }else if(extension=='mp4' || extension=='webm'){
      this.fileType = "video"
    }else if(extension=='mpeg'){
      this.fileType = "audio"
    }else{
      this.fileType = "doc"
    }
    this.previewUrl = response.data.previewUrl
    this.commonService.hideLoader()
    })
  }

  
  ngAfterViewInit() {
   
  }
}
