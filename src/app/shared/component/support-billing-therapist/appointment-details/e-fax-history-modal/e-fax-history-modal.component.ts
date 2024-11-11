import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/api/auth.service';


export interface PeriodicElement {
  noteType: string;
  dateOfService: string;
  createdAt: string;
  status: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-e-fax-history-modal', 
  templateUrl: './e-fax-history-modal.component.html',
  styleUrl: './e-fax-history-modal.component.scss'
})
export class EFaxHistoryModalComponent {
  displayedColumns: string[] = ['dateOfService', 'noteType', 'createdAt', 'status'];
  dataSource = ELEMENT_DATA;
  appointmentId = ""
  dataLength :any
  constructor(public authService: AuthService,@Inject(MAT_DIALOG_DATA) public data: any){
    this.appointmentId = data.appointmentId;
    let reqVars = {
      appointmentId:this.appointmentId
    }
    this.authService.apiRequest('post', 'soapNote/getFaxHistory', reqVars).subscribe(response => {
      this.dataSource = response.data
      this.dataLength = response.data.length
    })
    
  }

}



