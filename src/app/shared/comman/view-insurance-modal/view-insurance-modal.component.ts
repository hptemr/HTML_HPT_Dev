import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CmsModalComponent } from '../cms-modal/cms-modal.component';
import { AuthService } from '../../services/api/auth.service';
import { CommonService } from '../../services/helper/common.service';
import { s3Details } from 'src/app/config';
import { MatRadioChange } from '@angular/material/radio';
import { tr } from 'date-fns/locale';
@Component({
  selector: 'app-view-insurance-modal',
  templateUrl: './view-insurance-modal.component.html',
  styleUrl: './view-insurance-modal.component.scss'
})
export class ViewInsuranceModalComponent {
  info: any
  workerCompensation:boolean=false
  isPatientMinor:boolean=false
  isPatientMinorVal:string = 'no'
  selectedValue: number;

  constructor(public dialog: MatDialog, private commonService: CommonService,
    private authService: AuthService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.info = data.payViaInsuranceInfo;
    console.log('info >>>>>',this.info)
    if(this.info?.injuryRelelatedTo && this.info?.injuryRelelatedTo=="Worker's Compensation (WCOMP)"){
      this.workerCompensation = true
    }    
      
    if(this.info?.isPatientMinor=='yes'){
      this.isPatientMinor = true;
      this.isPatientMinorVal = 'yes'
    }   
        
    if((this.info?.isPatientMinor!='yes' || this.info?.isPatientMinor!='no') && this.info?.isPatientMinor){
      this.isPatientMinor = true;
      this.isPatientMinorVal = 'yes'
    }
  }

  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }

  cmsModal() {
    const dialogRef = this.dialog.open(CmsModalComponent, {
      panelClass: 'cms--container',
    });
  }

  openCMSmodal(event:any) {  
    if (event.checked === true) {
      const dialogRef = this.dialog.open(CmsModalComponent,{
        panelClass: 'cms--container', 
      });
    } else{ 
    }
  }

  getIcon(row: any) {
    let fileType = row.split(/[#?]/)[0].split('.').pop().trim();
    let icon = ''
    if (['png', 'jpg', 'jpeg', 'webp'].includes(fileType)) {
      icon = 'image'
    } else if (['doc', 'docx'].includes(fileType)) {
      icon = 'description'
    } else {
      icon = 'picture_as_pdf'
    }
    return icon
  }

  async download(fileName: any) {
    this.commonService.showLoader()
    let params = { fileName: fileName, filePath: s3Details.patientInsuranceFolderPath }
    await this.authService.apiRequest('post', 'appointment/download', params).subscribe(async response => {
      const link = document.createElement('a');
      link.href = response.data.url;
      link.click();
      this.commonService.hideLoader()
    })
  }

}