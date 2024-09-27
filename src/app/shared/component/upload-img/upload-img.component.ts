import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ProfilePicService } from '../../services/profile-pic.service';
@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent {
  public imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedImageEvent: any;
  imageBase64: any = '';
  saveButtonShow = false;
  roundCropper = true;
  isInvalidType = false;
  
  constructor(public dialogRef: MatDialogRef<UploadImgComponent >,  @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event; 
  }
 
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageEvent = event;
    this.croppedImage = event;     
  } 

  imageLoaded() { 
    this.isInvalidType = false;
  }

  cropperReady() { 
    this.saveButtonShow = true;
  }

  loadImageFailed() {
    this.isInvalidType = true;
  }
 
}
