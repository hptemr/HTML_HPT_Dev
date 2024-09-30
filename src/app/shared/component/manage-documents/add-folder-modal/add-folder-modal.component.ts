import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-folder-modal',
  templateUrl: './add-folder-modal.component.html',
  styleUrl: './add-folder-modal.component.scss'
})
export class AddFolderModalComponent {
  headerName = ""
  labelName = ""
  inputValue = ""
  uploadErrorMessage = ""
  uploadError = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<AddFolderModalComponent>){
    this.headerName = this.data.headerName
    this.labelName = this.data.labelName
    if(this.data.error!=""){
      this.uploadErrorMessage = this.data.error
      this.uploadError = true;
      this.inputValue = this.data.updateValue
    }else{
      this.uploadError = false;
    }
    if(this.data.type=='update'){
      this.inputValue = this.data.updateValue
    }
  }

  submit(){
    if(this.inputValue!=''){
      this.dialogRef.close(this.inputValue.trim())
    }
  }
}
