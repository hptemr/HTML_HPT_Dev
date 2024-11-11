import { Component } from '@angular/core';
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

  constructor(public authService: AuthService){
    let reqVars = {}
    this.authService.apiRequest('post', 'soapNote/getFaxHistory', reqVars).subscribe(response => {
      this.dataSource = response.data
    })
  }

}



