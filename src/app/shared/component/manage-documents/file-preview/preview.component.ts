import { Component, ViewChild } from '@angular/core';
import { protocolDirectory } from '../../../../config'
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent {
  previewUrl =  ""
  fileId:any
  constructor(private authService: AuthService,private route: ActivatedRoute) {
    this.fileId = this.route.snapshot.paramMap.get('file');
    var searchParams = { 
      fileId: this.fileId,
    }
    this.authService.apiRequest('post', 'admin/previewDocumentFile', searchParams).subscribe(async response => {
      this.previewUrl = response.message.previewUrl
    })
  }

  
  ngAfterViewInit() {
   
  }
}
