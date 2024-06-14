import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CmsModalComponent } from '../cms-modal/cms-modal.component';
import { SharedModule } from '../../shared.module';
import { AuthService } from '../../services/api/auth.service';
import { CommonService } from '../../services/helper/common.service';
import { s3Details } from 'src/app/config';

@Component({
  selector: 'app-view-insurance-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './view-insurance-modal.component.html',
  styleUrl: './view-insurance-modal.component.scss'
})
export class ViewInsuranceModalComponent {
  info: any

  constructor(public dialog: MatDialog, private commonService: CommonService,
    private authService: AuthService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.info = data.payViaInsuranceInfo
    console.log(this.info)
  }

  cmsModal() {
    const dialogRef = this.dialog.open(CmsModalComponent, {
      panelClass: 'cms--container',
    });
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
