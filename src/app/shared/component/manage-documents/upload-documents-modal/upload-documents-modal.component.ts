import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-upload-documents-modal',
  templateUrl: './upload-documents-modal.component.html',
  styleUrl: './upload-documents-modal.component.scss'
})
export class UploadDocumentsModalComponent {
  documentName = ""
  uploadError = false
  uploadedFile:any
  uploadErrorMessage = ""
  previewUrl = ""
  directory = ""
  userId = ""
  submitted = false
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<UploadDocumentsModalComponent>,private authService: AuthService,public commonService: CommonService){
    this.directory = this.data.directory
    this.userId = this.data.userId
  }
  onFileChange(event: any) {
    const files = event.target.files;
    this.uploadedFile = files
    var size = files[0].size / (1024 * 1024)
    if (size >= 15) {
      this.uploadErrorMessage = "The file exceeds the maximum file size limit. Please note that the maximum size allowed is 15mb."
      this.uploadError = true;
    } else if(files[0].type=='application/x-msdownload' || files[0].type=='application/x-putty-private-key'){
      this.uploadErrorMessage = "Invalid file type, please upload mentioned above file type"
      this.uploadError = true;
    } else {
      this.uploadErrorMessage = ""
      this.uploadError = false;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result
    };
    reader.readAsDataURL(files[0]);
  }

  removeItem(){
    this.previewUrl = ""
    this.uploadError = false
    this.fileInput.nativeElement.value = null;
  }

  shortName(fileName:any){
    if (fileName && fileName.length > 30){
      return fileName.substring(0, 28).replace(/^[a-z]/, function(m:any){ return m.toUpperCase() }) + '...' 
    } else {
      return fileName.replace(/^[a-z]/, function(m:any){ return m.toUpperCase() })
    } 
  }

  async uploadDocument(){
    this.submitted = true
    if(this.uploadedFile==undefined || this.uploadError || this.documentName==''){
      return
    }
    // this.commonService.showLoader()
    const formData:any = new FormData();
    var fileExtension = this.uploadedFile[0].name.split('.').pop()
    formData.append('directory', this.directory);
    formData.append('documentName', this.documentName.trim()+'.'+fileExtension);
    formData.append('uploadFile', this.uploadedFile[0], this.uploadedFile[0].name);
    formData.append('endUserId',this.userId)
    this.authService.apiRequest("post", "admin/uploadDocumentFile", formData).subscribe(
      async (res) => {
        this.commonService.openSnackBar("Created Successfully", "SUCCESS")
        // await this.commonService.hideLoader()
        this.submitted = false
        this.dialogRef.close(true)
      },(err)=>{
        this.commonService.openSnackBar(err.error.message, "ERROR")
        // this.commonService.hideLoader()
        this.uploadErrorMessage = err.error.message
        this.uploadError = true;
      })
  }
}
